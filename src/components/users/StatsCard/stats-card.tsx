import React from "react";
import { type LucideIcon } from "lucide-react";
import "./stats-card.scss";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  variant: "users" | "active" | "loans" | "savings";
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  label,
  value,
  variant,
}) => {
  return (
    <div className="stats-card" data-testid={`stats-card-${variant}`}>
      <div className={`stats-card__icon stats-card__icon--${variant}`}>
        <Icon />
      </div>
      <span className="stats-card__label">{label}</span>
      <span className="stats-card__value">{value.toLocaleString()}</span>
    </div>
  );
};

export default StatsCard;
