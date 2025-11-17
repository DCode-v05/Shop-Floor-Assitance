import React from "react";
export default function TriageFeed({logs}) {
  return (
    <div className="panel">
      <h3>Action / Triage Feed</h3>
      <ul className="feed">
        {logs.slice(0,40).map((l, i) => (
          <li key={i}>
            <div><strong>{l.agent || l.actor || l.action}</strong> — {l.msg || l.event?.type || JSON.stringify(l.event || l)} </div>
            <div className="timestamp">{l.timestamp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
