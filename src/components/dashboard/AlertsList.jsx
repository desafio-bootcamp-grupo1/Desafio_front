import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { AlertTriangle } from "lucide-react";

export default function AlertsList({ alerts }) {
  const dot = (t) =>
    t === "danger" ? "#ef4444" : t === "warning" ? "#f59e0b" : t === "success" ? "#22c55e" : "#3b82f6";

  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="flex items-center" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:8}}>
            <AlertTriangle size={18} style={{color:"var(--coral)"}} />
            Alertas del Sistema
          </span>
          <span className="badge badge--danger">2 urgentes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="alerts">
          {alerts.map((a, i) => (
            <div key={i} className="alerts__row">
              <span className="alerts__dot" style={{ background: dot(a.type) }} />
              <div className="alerts__content">
                <div className="alerts__line">
                  <p className="alerts__msg">{a.message}</p>
                  <span className={`badge badge--${a.priority}`}>{a.priority}</span>
                </div>
                <p className="alerts__time">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
