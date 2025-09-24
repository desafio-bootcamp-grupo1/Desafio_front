import React from "react";
// import "../../styles/components/_card.scss";

export function Card({ className = "", children, ...props }) {
  return (
    <div className={`card ${className}`} {...props}>{children}</div>
  );
}

export function CardHeader({ className = "", children }) {
  return <div className={`card__header ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }) {
  return <h3 className={`card__title ${className}`}>{children}</h3>;
}

export function CardContent({ className = "", children }) {
  return <div className={`card__content ${className}`}>{children}</div>;
}

export function CardFooter({ className = "", children }) {
  return <div className={`card__footer ${className}`}>{children}</div>;
}
