from fastapi import APIRouter, File, UploadFile, Form, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from typing import Dict, Any
import json

import uuid

from datetime import datetime

from backend.app.generator import ImageGeneratorG

router = APIRouter()

# In-memory storage for job status and results
jobs_db = {}

@router.get("/status/{job_id}")
def get_job_status(job_id: str):
    """
    returns the status of the job ["queued", "running", "done", "failed"]
    """
    if job_id not in jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")

    return {
        "job_status": jobs_db[job_id]["status"],
    }


@router.get("/results/{job_id}")
def get_job_results(job_id: str):
    """
    returns the results of the job
    """

    if job_id not in jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")

    job = jobs_db[job_id]

    if job["status"] != "done":
        raise HTTPException(
            status_code=400,
            detail=f"Job is not completed yet. Current status: {job['status']}"
        )

    return {
        "job_status": job["status"],
        "total_price": job.get("total_price", 0),
        "items": job.get("items", []),
    }


def process_job(job_id: str, image_bytes: bytes, params_dict: Dict[str, Any]):
    """
    This function runs in the background
    """
    try:
        jobs_db[job_id]["status"] = "running"
        jobs_db[job_id]["started_at"] = datetime.now().isoformat()

        generator = ImageGeneratorG()

        user_prompt = params_dict["prompt"]
        user_price = params_dict["max_price"]

        system_prompt = ImageGeneratorG.generate_system_prompt(user_prompt, user_price)

        running_prompt = system_prompt[0]
        running_images = system_prompt[1]
        running_images.append("../../input/" + str(job_id) + ".jpeg")



        #image = generator.generate_image(
        #    prompt=running_prompt,
        #    input_images=running_images,
        #    output_path=("../../results/" + str(job_id) + ".png")
        #)

        results_items = system_prompt[2]
        total_price = system_prompt[3]

        # Update with results
        jobs_db[job_id]["status"] = "done"
        jobs_db[job_id]["items"] = results_items
        jobs_db[job_id]["total_price"] = total_price

        jobs_db[job_id]["completed_at"] = datetime.now().isoformat()

    except Exception as e:
        jobs_db[job_id]["status"] = "failed"
        jobs_db[job_id]["error"] = str(e)


@router.post("/generate")
async def generate(
        background_tasks: BackgroundTasks,
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

    job_id = str(uuid.uuid4())

    # Initialize job in database
    jobs_db[job_id] = {
        "status": "queued",
        "created_at": datetime.now().isoformat(),
        "filename": image.filename,
        "params": params_dict,
    }

    # start the job
    background_tasks.add_task(process_job, job_id, image_bytes, params_dict)

    return {
        "job_id": job_id,
        "message": "Job queued successfully",
    }
