import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Leaf, MapPin, DollarSign, TrendingUp } from "lucide-react";

export default function SummaryKpis({ stats }) {
  const items = [
    { icon: Leaf,       title: stats.co2Reduction,  label: "CO2 Reducido este mes",   className: "kpi--green"  },
    { icon: MapPin,     title: stats.totalDistance, label: "Distancia Total",         className: "kpi--blue"   },
    { icon: DollarSign, title: stats.fuelSavings,   label: "Ahorro en Combustible",   className: "kpi--coral"  },
    { icon: TrendingUp, title: stats.efficiency,    label: "Eficiencia Global",       className: "kpi--purple" },
  ];

  return (
    <div className="kpis">
      {items.map((it) => (
        <Card key={it.label} className={`kpi ${it.className}`}>
          <CardContent className="kpi__content">
            <it.icon className="kpi__icon" />
            <h3 className="kpi__value">{it.title}</h3>
            <p className="kpi__label">{it.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
