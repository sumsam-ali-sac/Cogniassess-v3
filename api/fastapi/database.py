from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
from logger import get_logger

logger = get_logger(__name__)


@asynccontextmanager
async def mongodb_connection():
    logger.info("Connecting to MongoDB")
    client = AsyncIOMotorClient(settings.mongo_uri)
    db = client.get_database("cogniassess")
    try:
        yield db
    finally:
        logger.info("Closing MongoDB connection")
        client.close()
