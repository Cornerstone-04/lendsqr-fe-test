import { useMemo } from "react";
import { Users as UsersIcon, UserCheck, Coins, PiggyBank } from "lucide-react";
import { useFilters, useUsers } from "@/hooks";
import { calculateUserStats } from "@/utils/stats-utils";
import { StatsCard, UsersError, UsersTable } from "@/components/users";
import "./users.scss";

export const Users = () => {
  const { users, loading, error } = useUsers();
  const { filteredUsers, applyFilters, resetFilters } = useFilters(users);

  const stats = useMemo(() => calculateUserStats(users), [users]);

  const statsConfig = [
    { icon: UsersIcon, label: "USERS", value: stats.total, variant: "users" },
    {
      icon: UserCheck,
      label: "ACTIVE USERS",
      value: stats.active,
      variant: "active",
    },
    {
      icon: Coins,
      label: "USERS WITH LOANS",
      value: stats.withLoans,
      variant: "loans",
    },
    {
      icon: PiggyBank,
      label: "USERS WITH SAVINGS",
      value: stats.withSavings,
      variant: "savings",
    },
  ] as const;

  if (error) return <UsersError error={error} />;

  return (
    <div className="users-page" data-testid="users-page">
      <h1 className="users-page__title">Users</h1>

      <div className="users-page__stats">
        {statsConfig.map((cfg) => (
          <StatsCard
            key={cfg.label}
            icon={cfg.icon}
            label={cfg.label}
            value={cfg.value.toLocaleString()}
            variant={cfg.variant}
          />
        ))}
      </div>

      <UsersTable
        users={filteredUsers}
        loading={loading}
        onFilter={applyFilters}
        onResetFilter={resetFilters}
      />
    </div>
  );
};
