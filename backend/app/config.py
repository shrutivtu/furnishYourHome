from dotenv import load_dotenv
import os
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)
load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
runware_api_key = os.getenv("RUNWARE_API_KEY")
google_api_key = os.getenv("GOOGLE_API_KEY")
