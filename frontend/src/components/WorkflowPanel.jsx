import React from "react";

function Badge({ children, type }){
  const cls = `badge ${type||''}`.trim();
  return <span className={cls}>{children}</span>;
}

function Step({ title, children }){
  return (
    <div className="step">
      <div className="step-title">{title}</div>
      <div className="step-body">{children}</div>
    </div>
  );
}

export default function WorkflowPanel({ workflows=[] }){
  return (
    <div className="panel">
      <h2>Agent Workflow</h2>
      {workflows.length === 0 && <div className="muted">Waiting for events…</div>}
      <ul className="workflow">
        {workflows.map((wf, idx) => {
          const ev = wf.event || {};
          const tri = wf.triage || {};
          const exec = wf.executed || [];
          return (
            <li key={idx} className="flow-card">
              <div className="flow-grid">
                <Step title="Event">
                  <div className="kv"><span>Source</span><strong>{ev.source}</strong></div>
                  <div className="kv"><span>Type</span><code>{ev.type}</code></div>
                </Step>
                <div className="connector" />
                <Step title="Triage">
                  <div className="row">
                    <Badge type={`sev-${(tri.severity||'S4').toLowerCase()}`}>{tri.severity||'S4'}</Badge>
                    <Badge>{tri.category||'Unknown'}</Badge>
                  </div>
                  <div className="rationale">{tri.rationale}</div>
                </Step>
                <div className="connector" />
                <Step title="Tools">
                  {exec.length === 0 && <div className="muted">No actions</div>}
                  {exec.map((e,i)=> (
                    <div key={i} className="tool-row">
                      <Badge type="tool">{e.call?.name}</Badge>
                      <span className="tool-args">{JSON.stringify(e.call?.args||{})}</span>
                    </div>
                  ))}
                </Step>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
