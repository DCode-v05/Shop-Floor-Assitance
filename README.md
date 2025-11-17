Agentic Manufacturing PoC – Graph Architecture
=============================================

Overview
--------
- Backend: FastAPI with a single global router graph that triages events and executes tools.
- Frontend: React dashboard polling machines, orders, safety logs, and action logs.
- Data: JSON files under `server/data/` used as the demo data source and action log sink.

Run (Windows cmd)
-----------------
Backend
```
cd "d:\\Deni\\Mr.Tech\\Internships\\September Platforms\\Manufacture Intelligence"
env\Scripts\activate.bat
pip install -r requirements.txt
uvicorn server.main:app --reload --port 8000
```

Frontend
```
cd "d:\\Deni\\Mr.Tech\\Internships\\September Platforms\\Manufacture Intelligence\\frontend"
set REACT_APP_API_URL=http://localhost:3000
rem Optional: override WebSocket URL
rem set REACT_APP_WS_URL=ws://localhost:3000/ws
npm install
npm start
```

Key Endpoints
-------------
- `GET /machines`, `GET /orders`, `GET /safety_logs`, `GET /logs`
- `POST /publish_event` – submit an ad-hoc event
- `GET /memory` – snapshot of global graph memory (counters + last triage)
- `WS /ws` – WebSocket stream for live logs and triage results

Architecture
------------
- Global Router Graph (`server/graph/engine.py`)
	- Event queue (async) and in-memory state (counters, last triage).
	- Nodes:
		- LLM triage node: Mock or OpenAI (configurable).
		- Router: selects tool nodes from triage output.
		- Tool nodes: `stop_machine`, `schedule_maintenance`, `notify`, `update_order`.
	- Memory: counts by category/severity, last triage.

- Agents
	- Safety Agent: consumes `safety_logs.json`, publishes events, marks entries resolved after processing.
	- Shopfloor Agent: monitors `machines.json` and raises `machine_overheat`.
	- Order Agent: monitors `orders.json` and raises `order_delay`.
	- Supervisor Agent: summarizes recent log activity and escalates when critical events surge.

Config
------
- `.env` supported. Important vars:
	- `PORT` (default 8000)
	- `USE_OPENAI_TRIAGE=1` to enable OpenAI triage
	- `OPENAI_API_KEY`, `TRIAGE_MODEL` (default `gpt-4.1`)