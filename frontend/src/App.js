import React, {useEffect, useState} from "react";
import { fetchMachines, fetchOrders, fetchLogs, fetchSafetyLogs, publishEvent, connectStream } from "./api";
import MachinesPanel from "./components/MachinesPanel";
import OrdersPanel from "./components/OrdersPanel";
import SafetyLogsPanel from "./components/SafetyLogsPanel";
import WorkflowPanel from "./components/WorkflowPanel";

export default function App(){
  const [machines, setMachines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [logs, setLogs] = useState([]);
  const [safety, setSafety] = useState([]);
  const [workflows, setWorkflows] = useState([]);

  async function loadAll(){
    setMachines(await fetchMachines());
    setOrders(await fetchOrders());
    setLogs(await fetchLogs());
    setSafety(await fetchSafetyLogs());
  }

  useEffect(()=>{
    // Initial load and periodic refresh for machines/orders/safety
    loadAll();
    const id=setInterval(loadAll, 5000);
    // Live log + triage feed via WebSocket
    const ws = connectStream((msg)=>{
      if(msg?.type === 'log'){
        setLogs(prev => [msg.data, ...prev].slice(0, 500));
      }
      if(msg?.type === 'triage'){
        // Render full workflow cards from triage results
        setWorkflows(prev => [msg.data, ...prev].slice(0, 50));
      }
      if(msg?.type === 'safety_resolved'){
        const id = msg?.data?.id;
        if(id){
          setSafety(prev => prev.map(it => it.id === id ? {...it, status: 'resolved'} : it));
        }
      }
    });
    return ()=>{ clearInterval(id); try{ ws && ws.close(); }catch(_){} };
  },[]);

  async function onResolve(log){
    // publish a manual resolve event
    await publishEvent({source:"UI","type":"safety_resolve","payload": {"id":log.id}});
    alert("Resolve event published.");
    loadAll();
  }

  return (
    <div className="container">
      <h1>Agentic Manufacturing — Dashboard</h1>
      <div className="grid">
        <MachinesPanel machines={machines}/>
        <OrdersPanel orders={orders}/>
        <WorkflowPanel workflows={workflows}/>
        <SafetyLogsPanel logs={safety} onResolve={onResolve}/>
      </div>
    </div>
  );
}
