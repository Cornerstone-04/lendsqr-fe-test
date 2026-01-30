import React, { useMemo } from 'react';
import { Users as UsersIcon, UserCheck, Coins, PiggyBank } from 'lucide-react';
import { useUsers } from '../../hooks/useUsers';
import { useFilters } from '../../hooks/useFilters';
import { type UserStatus } from '../../types/user.types';
import StatsCard from '../../components/users/StatsCard/stats-card';
import UsersTable from '../../components/users/UsersTable/users-table';
import './users.scss';

export const Users: React.FC = () => {
  const { users, loading, error } = useUsers();
  const { filteredUsers, applyFilters, resetFilters } = useFilters(users);

  // Calculate stats based on filtered users
  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter(u => u.status === 'Active').length,
      withLoans: users.filter(u => u.loanRepayment && parseFloat(u.loanRepayment.replace(/[^0-9.-]+/g, '')) > 0).length,
      withSavings: users.filter(u => u.accountBalance && parseFloat(u.accountBalance.replace(/[^0-9.-]+/g, '')) > 0).length,
    };
  }, [users]);

  const handleUserUpdate = (userId: string, newStatus: UserStatus) => {
    // This will be handled by the UsersTable component internally
    // through IndexedDB updates
    console.log('User updated:', userId, newStatus);
  };

  if (error) {
    return (
      <div className="users-page" data-testid="users-page">
        <h1 className="users-page__title">Users</h1>
        <div className="users-page__error">
          <p>Error loading users: {error.message}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="users-page" data-testid="users-page">
      <h1 className="users-page__title">Users</h1>
      
      <div className="users-page__stats">
        <StatsCard 
          icon={UsersIcon} 
          label="USERS" 
          value={stats.total.toLocaleString()} 
          variant="users" 
        />
        <StatsCard 
          icon={UserCheck} 
          label="ACTIVE USERS" 
          value={stats.active.toLocaleString()} 
          variant="active" 
        />
        <StatsCard 
          icon={Coins} 
          label="USERS WITH LOANS" 
          value={stats.withLoans.toLocaleString()} 
          variant="loans" 
        />
        <StatsCard 
          icon={PiggyBank} 
          label="USERS WITH SAVINGS" 
          value={stats.withSavings.toLocaleString()} 
          variant="savings" 
        />
      </div>

      <UsersTable 
        users={filteredUsers} 
        loading={loading}
        onUserUpdate={handleUserUpdate}
        onFilter={applyFilters}
        onResetFilter={resetFilters}
      />
    </div>
  );
};