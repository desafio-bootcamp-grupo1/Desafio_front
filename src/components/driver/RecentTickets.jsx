import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Ticket } from "lucide-react";

export default function RecentTickets({ tickets = [] }) {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="flex items-center" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:8}}>
            <Ticket size={18} style={{color:"var(--coral)"}} />
            Tickets Recientes
          </span>
          <span className="badge">Últimos</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="recent-tickets">
          {tickets.map(t => (
            <div key={t.id} className="recent-tickets__row">
              <div>
                <div className="recent-tickets__date">{t.date}</div>
              </div>
              <div className="recent-tickets__amount">{t.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
