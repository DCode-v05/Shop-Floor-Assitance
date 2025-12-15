# Shop Floor Assistance (Agentic Manufacturing PoC)

## Project Description
This project demonstrates an **Agentic Manufacturing Proof of Concept (PoC)** using a graph-based architecture. It simulates a shop floor environment where autonomous agents collaborate to manage machines, orders, and safety logs. The system features a **FastAPI** backend that acts as the central intelligence core, triaging events and executing tools, and a **React** frontend that provides a real-time dashboard for operators.

---

## Project Details

### Problem Statement
Modern manufacturing floors generate vast amounts of data and require rapid decision-making to maintain efficiency and safety. This project addresses the challenge of coordinating various shop floor activities—such as machine monitoring, order tracking, and safety compliance—by employing a network of intelligent agents that can autonomously detect issues, prioritize tasks, and execute remedial actions.

### Architecture & Data
- **Backend Core**: Built with **FastAPI**, featuring a single global router graph (`server/graph/engine.py`) that manages event triage and tool execution.
- **Agents**:
  - **Shopfloor Agent**: Monitors machine states (e.g., detecting overheating).
  - **Order Agent**: Tracks order progress and identifies delays.
  - **Safety Agent**: Processes safety logs and resolves hazards.
  - **Supervisor Agent**: Aggregates logs and escalates critical situations.
- **Data Source**: The system uses JSON files located in `server/data/` as a lightweight database for machines, orders, and logs.

### Key Features
- **Global Event Router**: an asynchronous event queue that uses an LLM (or mock) triage node to route events to the appropriate tools.
- **Tool Nodes**: Specialized functions for actions like `stop_machine`, `schedule_maintenance`, `notify`, and `update_order`.
- **Real-time Updates**: The frontend talks to the backend via HTTP polling and **WebSockets** for live log streaming.

### Web Application
The solution consists of two main components:
1.  **Backend (Port 8000)**: Handles logic, graph execution, and API endpoints (`/machines`, `/orders`, `/publish_event`, etc.).
2.  **Frontend (Port 3000)**: A React-based dashboard that allows users to:
    - View the status of all machines and orders.
    - Monitor safety logs and agent actions in real-time.
    - Manually publish ad-hoc events for testing.

---

## Tech Stack
- **Backend**: Python 3.x, FastAPI, Uvicorn
- **Frontend**: React.js, HTML/CSS
- **Communication**: HTTP REST APIs, WebSockets
- **AI/LLM**: Integration for event triage (configurable for OpenAI or Mock)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/DCode-v05/Shop-Floor-Assitance.git
cd Shop-Floor-Assitance
```

### 2. Backend Setup
Navigate to the root directory (where `requirements.txt` is located):
```bash
# Optional: Create and activate a virtual environment
# python -m venv env
# env\Scripts\activate

pip install -r requirements.txt
```

### 3. Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
npm install
```

### 4. Run the Application

**Start the Backend:**
```bash
# In the root directory
uvicorn server.main:app --reload --port 8000
```

**Start the Frontend:**
```bash
# In the frontend directory
# set REACT_APP_API_URL=http://localhost:8000 (if needed)
npm start
```

---

## Usage
- Open your browser and navigate to `http://localhost:3000`.
- The dashboard will display the current state of machines and orders loaded from the JSON data.
- Watch the **Action Log** to see agents responding to events (e.g., stopping an overheating machine).
- Use the **Publish Event** feature (if available in UI or via API) to simulate new scenarios.

---

## Project Structure
```
Shop-Floor-Assitance/
│
├── frontend/               # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── MachinesPanel.js
│   │   │   ├── OrdersPanel.js
│   │   │   ├── SafetyLogsPanel.js
│   │   │   ├── TriageFeed.js
│   │   │   └── WorkflowPanel.jsx
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   ├── package-lock.json
│   └── package.json
│
├── server/                 # FastAPI Backend
│   ├── agents/             # Agent logic
│   │   ├── __init__.py
│   │   ├── supervisor_agent.py
│   │   └── triage_agent.py
│   ├── data/               # JSON data stores
│   │   ├── action_log.json
│   │   ├── machines.json
│   │   ├── orders.json
│   │   ├── safety_logs.json
│   │   └── supervisor_state.json
│   ├── graph/              # Graph architecture
│   │   ├── __init__.py
│   │   ├── agents_loops.py
│   │   ├── engine.py
│   │   ├── event_router.py
│   │   ├── runner.py
│   │   ├── state.py
│   │   ├── tool_nodes.py
│   │   └── triage_graph.py
│   ├── prompts/            # LLM Prompts
│   │   └── triage_prompt.md
│   ├── static/
│   │   └── demo_dashboard.html
│   ├── tools/              # Action tools
│   │   ├── __init__.py
│   │   ├── notify_tools.py
│   │   ├── production_tools.py
│   │   └── safety_store.py
│   ├── __init__.py
│   ├── config.py
│   ├── llm.py
│   ├── main.py
│   └── realtime.py
│
├── .gitignore
├── requirements.txt        # Python dependencies
└── README.md               # Project documentation
```

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request describing your changes.

---

## Contact
- **GitHub:** [DCode-v05](https://github.com/DCode-v05)
- **Email:** denistanb05@gmail.com