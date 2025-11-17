# server/graph/runner.py
from server.graph.engine import GLOBAL_GRAPH

async def run_event(ev: dict):
    # Submit directly to the global router graph and process synchronously.
    return await GLOBAL_GRAPH.process_one(ev)
