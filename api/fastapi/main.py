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
    return {"message": "Text processed successfully", "userId": data.userId}


@app.post("/generate-questions/")
async def generate_questions(request: GenerationRequest):

    # summary_client = mclient(api_key=os.getenv("MONSTER_API_KEY"))
    # deploy_client = mclient(api_key=os.getenv("MONSTER_API_KEY"))

    if settings.CandidateContext == "":
        summary_client = settings.getClient()
        model = "mpt-7b-instruct"

        SummaryData = {
            "prompt": f"""
            Analyze the CV provided and summarize it in short, the summary should capture the essence of the candidate's professional 
            profile and qualifications while keeping the summary short.

            Please summarize the following CV:
            {request.cvContent}
            """,
            "max_length": 256
        }

        CandidateContext = summary_client.generate(model, SummaryData)
        settings.setCandidateContext(CandidateContext)
        print(CandidateContext)

    questions_list = []

    payload = {
        "input_variables": {"system": str("Intelligent Assessment Generator"),
                            "prompt": str(settings.UserPrompt(Role=request.selectedRole, Domain=request.selectedDomain))},
        "temperature": 0.6,
        "max_tokens": 200,
    }

    service_client = settings.GetServiceClient()
    output = service_client.generate(model="deploy-llm", data=payload)

    res = json.loads(output)['text'][0].split('\n\n')[0]
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

    obj = json.loads(res)
    obj["domain"] = request.selectedDomain
    questions_list.append(obj)
    time.sleep(2)
    return GenerationResponse(questions=[Info(**question) for question in questions_list])
