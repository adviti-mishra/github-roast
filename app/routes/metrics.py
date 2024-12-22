# End points for getting metrics on GitHub repo
from fastapi import APIRouter
from app.services.github_api import get_pull_requests, get_commits
from app.services.data_analysis import calculate_most_ghosted, calculate_longest_period_of_inactivity
from pydantic import BaseModel

router = APIRouter()

# HELPER FUNCTIONS
class MetricsQuery(BaseModel):
    url: str


def fetch_most_ghosted():
    """Fetch and calculate the most ghosted contributor."""
    # Fetch all PRs
    prs = get_pull_requests()
    # Calculate and return the most ghosted contributor
    return calculate_most_ghosted(prs)


def fetch_longest_period_of_inactivity():
    """Fetch and calculate the longest period of inactivity."""
    # Fetch all commits
    commits = get_commits()
    # Calculate and return the longest period of inactivity
    return calculate_longest_period_of_inactivity(commits)

# INDIVIDUAL ROUTES (for data dorks)


@router.get("/most_ghosted")
def most_ghosted():
    """Returns the most ghosted contributor."""
    most_ghosted_contributor = fetch_most_ghosted()
    return {"contributor": most_ghosted_contributor}


@router.get("/longest_period_of_inactivity")
def longest_period_of_inactivity():
    """Returns the length of the longest period of no commits"""
    longest_period = fetch_longest_period_of_inactivity()
    return {"longest_period_of_inactivity": longest_period}

# High-level route for web app

@router.post("/all")
async def get_all_metrics(data: MetricsQuery):
    url = data.url # Github URL
    """Returns all metrics as a single JSON object."""
    most_ghosted_contributor = fetch_most_ghosted()
    longest_period_of_inactivity = fetch_longest_period_of_inactivity()
    return {
        "most_ghosted": most_ghosted_contributor,
        "longest_period_of_inactivity": longest_period_of_inactivity
    }
