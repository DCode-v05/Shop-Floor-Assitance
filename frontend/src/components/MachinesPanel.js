import React from "react";
export default function MachinesPanel({machines}) {
  return (
    <div className="panel">
      <h3>Machines</h3>
      <table>
        <thead><tr><th>ID</th><th>Status</th><th>Temp</th><th>Vib</th></tr></thead>
        <tbody>
          {machines.map(m=>(
            <tr key={m.id} className={m.temperature>110 ? "critical": ""}>
              <td>{m.id}</td><td>{m.status}</td><td>{m.temperature}°C</td><td>{m.vibration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
