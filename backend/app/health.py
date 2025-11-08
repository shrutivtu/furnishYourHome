from fastapi import APIRouter, Response, status
from datetime import datetime, timezone
from openai import OpenAI


from backend.app import config

router = APIRouter()

@router.get("/")
def get_health(
        response: Response,
):
    client = OpenAI(api_key=config.openai_api_key)

    openai_status = False

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": "Say 'API test successful.'"}],
            max_tokens=10
        )

        print("OpenAI API connection successful!")
        print("Response:", response.choices[0].message.content.strip())
        openai_status = True

    except Exception as e:
        print("OpenAI API test failed.")
        print("Error:", e)


    return {
        "status": status.HTTP_200_OK,
        "server_time_utc": datetime.now(timezone.utc).isoformat(),
        "openai": openai_status,
    }