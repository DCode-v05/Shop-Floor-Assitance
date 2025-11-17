import json
import os
import threading
from typing import List, Dict, Any
from server.config import DATA_DIR

SAFETY_LOG_FILE = os.path.join(DATA_DIR, "safety_logs.json")
_LOCK = threading.Lock()


def load_safety_logs() -> List[Dict[str, Any]]:
    if not os.path.exists(SAFETY_LOG_FILE):
        return []
    try:
        with open(SAFETY_LOG_FILE, "r") as f:
            data = json.load(f)
            return data if isinstance(data, list) else []
    except Exception:
        return []


def save_safety_logs_atomic(logs: List[Dict[str, Any]]):
    os.makedirs(DATA_DIR, exist_ok=True)
    tmp = SAFETY_LOG_FILE + ".tmp"
    with open(tmp, "w") as f:
        json.dump(logs, f, indent=2)
    os.replace(tmp, SAFETY_LOG_FILE)


def mark_resolved(log_id: str) -> bool:
    with _LOCK:
        logs = load_safety_logs()
        found = False
        for item in logs:
            if item.get("id") == log_id and item.get("status") != "resolved":
                item["status"] = "resolved"
                found = True
                break
        if found:
            save_safety_logs_atomic(logs)
        return found
