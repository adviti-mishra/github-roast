# End points for getting metrics on GitHub repo
from fastapi import APIRouter

router = APIRouter()

# templates for routes

# Individual routes for data dorks

# returns the most ghosted contributor


@router.get("/most_ghosted")
def most_ghosted():
    # call the most_ghosted function
    # RIP @ adviti mishra
    return {"contributor": "adviti_mishra"}

# returns the length of the longest period without any commits


@router.get("/longest_period_of_inactivity")
def longest_repo_inactivity():
    # RIP again
    return {"longest_period_of_inactivity": "365"}

# High-level route for web app

# returns all the metrics


@router.get("/metrics")
def get_all_metrics():
    # call the most_ghosted_user function
    # call the longest_period_of_inactivity function
    # return results as a single json object
    return {
        "most_ghosted": "adviti_mishra",
        "longest_period_of_inactivity": "365"
    }
