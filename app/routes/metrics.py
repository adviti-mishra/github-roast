# End points for getting metrics on GitHub repo
from fastapi import APIRouter

router = APIRouter()

# templates for routes

# returns the most ghosted contributor


@router.get("/most_ghosted")
def most_ghosted():
    # RIP @ adviti mishra
    return {"contributor": "adviti_mishra"}

# returns the length of the longest period without any commits


@router.get("/longest_repo_inactivity")
def longest_repo_inactivity():
    # RIP again
    return {"longest_repo_inactivity": "365"}
