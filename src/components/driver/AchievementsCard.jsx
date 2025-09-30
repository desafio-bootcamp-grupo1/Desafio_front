import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

export default function AchievementsCard() {
  const achievements = [
    { id: "r1", title: "Rey de la Carretera", subtitle: "Kilómetros recorridos", earned: true },
    { id: "r2", title: "Explorador", subtitle: "Varias ciudades visitadas", earned: false },
    { id: "r3", title: "Eco Warrior", subtitle: "Ahorro en combustible", earned: true },
  ];

  return (
    <Card className="card">
      <CardHeader>
        <CardTitle>Logros</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="achievements">
          {achievements.map(a => (
            <li key={a.id} className={`achievement ${a.earned ? "achievement--done" : ""}`}>
              <div className="achievement__meta">
                <div className="achievement__title">{a.title}</div>
                <div className="achievement__subtitle">{a.subtitle}</div>
              </div>
              <div className="achievement__status">{a.earned ? "✅" : "—"}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
