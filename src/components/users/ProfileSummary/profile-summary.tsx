import { User as UserIcon, Star } from "lucide-react";
import type { User } from "@/types/user.types";

interface ProfileSummaryProps {
  user: User;
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export const ProfileSummary = ({
  user,
  tabs,
  activeTab,
  onTabChange,
}: ProfileSummaryProps) => {
  const renderStars = (tier: number) => {
    return [1, 2, 3].map((i) => (
      <Star
        key={i}
        size={16}
        fill={i <= tier ? "#E9B200" : "none"}
        stroke="#E9B200"
        strokeWidth={1.5}
      />
    ));
  };

  return (
    <div className="user-details__card user-details__profile-summary">
      <div className="user-details__profile">
        {/* Avatar Section */}
        <div className="user-details__avatar">
          <UserIcon size={40} />
        </div>

        {/* User Name and ID */}
        <div className="user-details__name-section">
          <div className="user-details__name">{user.fullName}</div>
          <div className="user-details__id">{user.id}</div>
        </div>

        {/* Tier Section */}
        <div className="user-details__tier">
          <div className="user-details__tier-label">User's Tier</div>
          <div className="user-details__tier-stars">
            {renderStars(user.userTier)}
          </div>
        </div>

        {/* Financial Section */}
        <div className="user-details__balance">
          <div className="user-details__balance-amount">
            {user.accountBalance.toLocaleString()}
          </div>
          <div className="user-details__balance-bank">
            {user.accountNumber}/{user.bankName}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="user-details__tabs">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`user-details__tab ${
              activeTab === i ? "user-details__tab--active" : ""
            }`}
            onClick={() => onTabChange(i)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};
