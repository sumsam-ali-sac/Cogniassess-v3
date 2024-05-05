from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
from monsterapi import client as mclient
import json
from config import settings
from logger import get_logger
from models import TextData, GenerationRequest, GenerationResponse, Info, Question
import time
import os
import re
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = get_logger(__name__)


@asynccontextmanager
async def mongodb_connection(app: FastAPI):
    db_uri = settings.mongo_uri
    if not db_uri:
        logger.error("MongoDB URI is not set.")
        raise RuntimeError("MongoDB URI is not set.")
    mongodb_client = AsyncIOMotorClient(db_uri)
    db = mongodb_client.get_database(settings.db_name)
    logger.info("Connected to MongoDB")
    try:
        yield
    finally:
        logger.info("Disconnecting MongoDB")
        await mongodb_client.close()

app = FastAPI(lifespan=mongodb_connection)
model = "llama2-7b-chat"
CandidateContext = ""

# API endpoints


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@app.post("/process-text/")
async def process_text(data: TextData):
    logger.info(f"Received user ID: {data.userId}")
    logger.info(f"Received text: {data.extractedText}")
    key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkZGRhNjcyYTFmOGY5MDVmYzQxZGIxYmM5ODg4OWRhIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMDFUMTA6MTc6MTYuMzA3ODU0In0.tepuJ2ycdTeh4vxRk2U95crWaBC1s7Fp9MGUOqDyMyw"
    if settings.CandidateContext == "":
        context_client = mclient(
            api_key=key)
        settings.setCVcontent(data.extractedText)
        context_prompt = "<|User|>" + settings.UserPromptLCVcontext() + "<s>"
        summary_prompt = "<|User|>" + settings.UserPromptSummarizeCV() + "<s>"

        ContextData = {
            "prompt": context_prompt,
            "max_length": "1024",
            "temprature": 0.8,
        }

        SummaryData = {
            "prompt": summary_prompt,
            "max_length": "512",
            "temprature": 0.8,
        }

        CandidateContext = context_client.generate(model, ContextData)
        CVsummary = context_client.generate(model, SummaryData)

        settings.setCandidateContext(CandidateContext['text'])
        settings.setCVsummary(CVsummary['text'])
        # print(CandidateContext['text'])
        # print("----------------------------------------------------------------")
        # print(CVsummary['text'])

    return {"summary": CVsummary['text'], "analysis": CandidateContext['text'], "userId": data.userId}


@app.post("/analysis")
async def analyze_cv(data: TextData):
    logger.info(f"Received user ID: {data.userId}")
    logger.info(f"Received text: {data.extractedText}")
    key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkZGRhNjcyYTFmOGY5MDVmYzQxZGIxYmM5ODg4OWRhIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMDFUMTA6MTc6MTYuMzA3ODU0In0.tepuJ2ycdTeh4vxRk2U95crWaBC1s7Fp9MGUOqDyMyw"
    if settings.CandidateContext == "":
        context_client = mclient(
            api_key=key)
        settings.setCVcontent(data.extractedText)
        context_prompt = "<|User|>" + settings.UserPromptLCVcontext() + "<s>"
        summary_prompt = "<|User|>" + settings.UserPromptSummarizeCV() + "<s>"

        ContextData = {
            "prompt": context_prompt,
            "max_length": "1024",
            "temprature": 0.8,
        }

        SummaryData = {
            "prompt": summary_prompt,
            "max_length": "512",
            "temprature": 0.8,
        }

        CandidateContext = context_client.generate(model, ContextData)
        CVsummary = context_client.generate(model, SummaryData)

        settings.setCandidateContext(CandidateContext['text'])
        settings.setCVsummary(CVsummary['text'])
        # print(CandidateContext['text'])
        # print("----------------------------------------------------------------")
        # print(CVsummary['text'])

    return {"summary": CVsummary['text'], "analysis": CandidateContext['text'], "userId": data.userId}


def parse_dict(text):
    dict_obj = {}
    pair_pattern = r'"\s*([^"]+)\s*"\s*:\s*(?:"([^"]*)"|(\{.*?\})|(\[.*?\]))'
    pairs = re.findall(pair_pattern, text, re.DOTALL)
    for key, str_value, dict_value, list_value in pairs:
        if str_value:
            dict_obj[key] = str_value
        elif dict_value:
            dict_obj[key] = parse_dict(dict_value)
        elif list_value:
            dict_obj[key] = parse_list(list_value)
    return dict_obj


def parse_list(text):
    list_obj = []
    items = re.findall(r'\{.*?\}', text, re.DOTALL)
    for item in items:
        list_obj.append(parse_dict(item))
    return list_obj


@app.post("/generate-questions/")
async def generate_questions(request: GenerationRequest):

    key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkZGRhNjcyYTFmOGY5MDVmYzQxZGIxYmM5ODg4OWRhIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMDFUMTA6MTc6MTYuMzA3ODU0In0.tepuJ2ycdTeh4vxRk2U95crWaBC1s7Fp9MGUOqDyMyw"
    if settings.CVsummary == "":
        context_client = mclient(
            api_key=key)

        settings.setCVcontent(request.cvContent)
        summary_prompt = "<|User|>" + settings.UserPromptSummarizeCV() + "<s>"

        SummaryData = {
            "prompt": summary_prompt,
            "max_length": "512",
            "temprature": 0.8,
        }
        CVsummary = context_client.generate(model, SummaryData)

        settings.setCVsummary(CVsummary['text'])

    questions_list = []

    # payload = {
    #     "input_variables": {"system": str("Intelligent Assessment Generator"),
    #                         "prompt": str(settings.UserPrompt(Role=request.selectedRole, Domain=request.selectedDomain))},
    #     "temperature": 0.6,
    #     "max_tokens": 200,
    # }

    # service_client = settings.GetServiceClient()
    # output = service_client.generate(model="deploy-llm", data=payload)
    # res = json.loads(output)['text'][0].split('\n\n')[0]

    questions_client = mclient(api_key=key)
    questions_data = {"prompt": settings.UserPromptLRoleDomain(request.selectedRole, request.selectedDomain
                                                               ), "max_length": "256", "temprature": 0.8}
    response = questions_client.generate(model, questions_data)

    # res = """
    # {
    #     "role": "Human Resource Manager",
    #     "domain": "Diversity and Inclusion",
    #     "questions": [
    #         {
    #             "id": "Q1",
    #             "text": "How do you ensure that the recruitment process is inclusive and diverse?"
    #         },
    #         {
    #             "id": "Q2",
    #             "text": "Can you discuss your experience with training and development programs for diverse employees?"
    #         }
    #     ]
    # }
    # """
    print(response)
    # res = "\n{\n" + response["text"].split("\n}\n")[0].split("\n{\n")[-1]
    # res = res.replace(",\n    }", "\n    }").replace(",\n]", "\n]")
    # obj = json.loads(res)
    # obj["domain"] = request.selectedDomain
    obj = parse_dict(response['text'])
    questions_list.append(obj)
    return GenerationResponse(questions=[Info(**question) for question in questions_list])
