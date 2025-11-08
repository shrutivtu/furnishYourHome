import requests
import time
import json
from pathlib import Path

# Base URL of your FastAPI server
BASE_URL = "http://localhost:8000"  # Adjust port if needed

test_image_path = "livingRoom.jpg"

# 2. Prepare the request
params_data = {
    "prompt": "prompt text with all the cool stuff",
    "max_price": 1000
}

files = {
    'image': ('test_image.jpg', open(test_image_path, 'rb'), 'image/jpeg')
}

data = {
    'params': json.dumps(params_data)
}

# 3. Submit the job
print("Submitting job...")
response = requests.post(f"{BASE_URL}/jobs/generate", files=files, data=data)
print(f"Response: {response.json()}\n")

if response.status_code != 200:
    print("Failed to submit job")

job_id = response.json()["job_id"]
print(f"Job ID: {job_id}\n")

# 4. Poll for status
max_attempts = 20
for attempt in range(max_attempts):
    print(f"Checking status (attempt {attempt + 1})...")
    status_response = requests.get(f"{BASE_URL}/jobs/status/{job_id}")
    status_data = status_response.json()
    print(f"Status: {status_data}\n")

    job_status = status_data["job_status"]

    if job_status == "done":
        print("Job completed!")
        break
    elif job_status == "failed":
        print("Job failed!")
        break

    time.sleep(2)  # Wait 2 seconds before checking again

# 5. Get results
print("Fetching results...")
results_response = requests.get(f"{BASE_URL}/jobs/results/{job_id}")
print (results_response.json())
