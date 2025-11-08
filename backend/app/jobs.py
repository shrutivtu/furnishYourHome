from fastapi import APIRouter, Depends, Response, status
from datetime import datetime, timezone

router = APIRouter()


@router.get("/health")
def get_health(
        response: Response,
):
    return {
        "status": status.HTTP_200_OK,
        "server_time_utc": datetime.now(timezone.utc).isoformat(),
    }

