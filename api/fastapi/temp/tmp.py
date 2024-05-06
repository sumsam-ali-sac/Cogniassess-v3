from typing import List, Optional
from pydantic import BaseModel
import json
# Define a class for the questions in the domain of Human Resources focusing on Diversity and Inclusion


class Question(BaseModel):
    id: str
    text: str


class Info(BaseModel):
    role: str
    domain: str
    questions: List[Question]


class GenerationResponse(BaseModel):
    questions: List[Info]


print(json.dumps(GenerationResponse.model_json_schema(), indent=2))
