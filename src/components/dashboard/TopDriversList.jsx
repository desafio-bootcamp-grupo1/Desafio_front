import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { Users } from "lucide-react";

export default function TopDriversList({ drivers }) {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="flex items-center" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:8}}>
            <Users size={18} style={{color:"var(--coral)"}} />
            Top Conductores
          </span>
          <span className="badge">Este Mes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="toplist">
          {drivers.map((d, i) => (
            <div key={d.name} className="toplist__row">
              <div className="toplist__rank">#{i + 1}</div>
              <div className="toplist__meta">
                <div className="toplist__name">{d.name}</div>
                <div className="toplist__small">{d.trips} viajes · {d.status === "active" ? "Activo" : "Mantenimiento"}</div>
              </div>
              <div className="toplist__right">
                <div className="toplist__eff">{d.efficiency}</div>
                <div className="toplist__save">{d.savings}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
