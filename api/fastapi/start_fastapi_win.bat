@echo off
REM Activate the Python virtual environment
call env\Scripts\activate

REM Start the FastAPI application from the correct directory
uvicorn main:app --reload --port 8000
