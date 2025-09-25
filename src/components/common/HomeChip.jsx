import React from "react";
import "../../styles/components/_chip.scss";

/** Round icon chip used on Home feature cards */
export default function HomeChip({ Icon, ariaLabel }) {
  return (
    <div className="chip" aria-label={ariaLabel}>
      <Icon className="chip__icon" />
    </div>
  );
}
