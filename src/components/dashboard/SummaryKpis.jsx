import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Leaf, MapPin, DollarSign, TrendingUp } from "lucide-react";

export default function SummaryKpis({ stats }) {
  const items = [
    { icon: Leaf,       title: '134kg',  label: "CO2 Reducido este mes",   className: "kpi--green"  },
    { icon: MapPin,     title: '1203kms', label: "Distancia Total",         className: "kpi--blue"   },
    { icon: DollarSign, title: '302.5L',   label: "Ahorro en Combustible",   className: "kpi--coral"  },
    { icon: TrendingUp, title: "89%",    label: "Eficiencia Global",       className: "kpi--purple" },
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
