from pydantic import BaseModel
from typing import Optional, List, Dict


class TextData(BaseModel):
    userId: str
    extractedText: str


class Question(BaseModel):
    id: str
    text: str


class Info(BaseModel):
    role: str
    domain: str
    questions: List[Question]


class GenerationRequest(BaseModel):
    selectedDomain: str
    selectedRole: str
    cvContent: str


class GenerationResponse(BaseModel):
    questions: List[Info]


class TextData(BaseModel):
    userId: str
    extractedText: str


class QuestionAnswerData(BaseModel):
    UserAnswers: str
