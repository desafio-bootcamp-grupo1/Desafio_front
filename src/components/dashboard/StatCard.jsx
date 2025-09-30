import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import "../../styles/components/_stat-card.scss";

export default function StatCard({ icon: Icon, label, value, hint, color = "coral" }) {
  return (
    <Card className={`stat-card stat-card--${color}`}>
      <CardContent className="stat-card__content">
        <div className="stat-card__text">
          <p className="stat-card__label">{label}</p>
          <p className="stat-card__value">{value}</p>
          {hint && <p className="stat-card__hint">{hint}</p>}
        </div>
        {Icon && <Icon className="stat-card__icon" />}
      </CardContent>
    </Card>
  );
}
