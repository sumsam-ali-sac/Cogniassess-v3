from pydantic import BaseModel


class TextData(BaseModel):
    userId: str
    extractedText: str
