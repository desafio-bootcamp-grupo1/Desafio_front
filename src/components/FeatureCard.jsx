import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/Card";
import HomeChip from "./common/HomeChip";

export default function FeatureCard({ Icon, title, description }) {
  return (
    <Card className="features__card">
      <CardHeader>
        <HomeChip Icon={Icon} ariaLabel={title} />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
