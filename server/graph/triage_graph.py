# server/graph/triage_graph.py
from server.llm import triage as triage_fn
from server.graph.state import TriageOutput, Event, ToolCall
from typing import Dict,Any

def triage_run(event: Event) -> TriageOutput:
    # Convert to simple dict and call MockLLM
    evdict = {"source": event.source, "type": event.type, "payload": event.payload}
    result = triage_fn(evdict)
    # convert tools_to_call names to ToolCall objects if present
    tools_list = result.get("tools_to_call", [])
    tri = TriageOutput(
        severity=result.get("severity","S4"),
        category=result.get("category","Unknown"),
        rationale=result.get("rationale",""),
        tools_to_call=[ToolCall(**t) if isinstance(t, dict) else t for t in tools_list]
    )
    return tri
