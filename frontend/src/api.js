const BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";
const WS_URL = process.env.REACT_APP_WS_URL || (BASE.replace(/^http/, "ws") + "/ws");

export async function fetchMachines() {
  const r = await fetch(`${BASE}/machines`); return r.json();
}
export async function fetchOrders() {
  const r = await fetch(`${BASE}/orders`); return r.json();
}
export async function fetchLogs() {
  const r = await fetch(`${BASE}/logs`); return r.json();
}
export async function fetchSafetyLogs() {
  const r = await fetch(`${BASE}/safety_logs`); return r.json();
}
export async function publishEvent(event) {
  const r = await fetch(`${BASE}/publish_event`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(event) });
  return r.json();
}

export function connectStream(onMessage) {
  const ws = new WebSocket(WS_URL);
  ws.onmessage = (evt) => {
    try {
      const msg = JSON.parse(evt.data);
      onMessage && onMessage(msg);
    } catch (_) {}
  };
  return ws;
}
