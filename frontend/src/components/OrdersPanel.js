import React from "react";
export default function OrdersPanel({orders}) {
  return (
    <div className="panel">
      <h3>Orders</h3>
      <table>
        <thead><tr><th>Order</th><th>Stage</th><th>Progress</th><th>Due(h)</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.order_id} className={o.progress<50 ? "warning": ""}>
              <td>{o.order_id}</td><td>{o.stage}</td><td>{o.progress}%</td><td>{o.due_in_hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
