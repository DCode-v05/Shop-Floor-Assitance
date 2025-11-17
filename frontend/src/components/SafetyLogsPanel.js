import React from "react";
export default function SafetyLogsPanel({logs, onResolve}) {
  return (
    <div className="panel">
      <h3>Safety Logs</h3>
      <table>
        <thead><tr><th>ID</th><th>Event</th><th>Location</th><th>Operator</th><th>Status</th><th>Details</th><th>Action</th></tr></thead>
        <tbody>
          {logs.map(l => (
            <tr key={l.id} className={l.status==="unresolved" ? "critical": ""}>
              <td>{l.id}</td>
              <td>{l.event_type}</td>
              <td>{l.location}</td>
              <td>{l.operator_id}</td>
              <td>{l.status}</td>
              <td>{l.details?.missing ? l.details.missing.join(", ") : JSON.stringify(l.details)}</td>
              <td>
                {l.status==="unresolved" && <button onClick={() => onResolve(l)}>Mark Resolved</button>}
                {l.status!=="unresolved" && <span className="badge">Resolved</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
