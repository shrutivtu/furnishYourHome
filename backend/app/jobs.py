from fastapi import APIRouter, Response, status, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from typing import Dict, Any
import json

from backend.app import config

router = APIRouter()

@router.get("/status/{job_id}")
def get_job_status(job_id: str):
    """
    returns the status of the job ["queued", "running", "done"]
    """

    return {
        "job_status": "queued",
    }

@router.get("/results/{job_id}")
def get_job_results(job_id: str):
    """
    returns the results of the job
    """

    return {
        "job_status": "done",
        "total_price": 0,
        "items" : [],
    }



@router.post("/generate")
async def process_image(
    image: UploadFile = File(...),
    params: str = Form(...),
):
    """
    (multipart/form-data):
    image: (file)
    params: '{"prompt": "prompt text with all the cool stuff", "max_price": 1000}'
    """

    # Parse the params string into a Python dict
    try:
        params_dict: Dict[str, Any] = json.loads(params)
    except json.JSONDecodeError:
        return JSONResponse(
            status_code=400,
            content={"error": "Invalid JSON in 'params' field"},
        )

    # Example of accessing parameters
    prompt = params_dict.get("prompt")
    max_price = params_dict.get("max_price")

    # Read image bytes (optional)
    image_bytes = await image.read()


    return {
        "message": "Image and parameters received successfully",
        "filename": image.filename,
        "params": params_dict,
    }

