from dotenv import load_dotenv
import os
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)
load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
