import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  UserX,
  UserCheck,
} from "lucide-react";
import type { User, UserFilters, UserStatus } from "../../../types/user.types";
import "./users-table.scss";
import FilterDropdown from "../../common/FilterDropdown/filter-dropdown";
import { updateUserStatus } from "../../../db/users.service";
import { toast } from "sonner";

interface UsersTableProps {
  users: User[];
  loading?: boolean;
  onUserUpdate?: (userId: string, status: UserStatus) => void;
  onFilter?: (filters: UserFilters) => void;
  onResetFilter?: () => void;
}

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  loading,
  onUserUpdate,
  onFilter,
  onResetFilter,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleFilter = (filters: UserFilters) => {
    onFilter?.(filters);
    setCurrentPage(1);
    setShowFilter(false);
  };

  const handleReset = () => {
    onResetFilter?.();
    setCurrentPage(1);
    setShowFilter(false);
  };

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
    setActiveDropdown(null);
  };

  const handleStatusChange = async (
    userId: string,
    userName: string,
    newStatus: UserStatus,
  ) => {
    onUserUpdate?.(userId, newStatus);
    setActiveDropdown(null);

    try {
      await updateUserStatus(userId, newStatus);
      setTimeout(() => {
        toast.success(`${userName} status updated to ${newStatus}.`);
      }, 1000);
    } catch (error) {
      toast.error(`Failed to update ${userName}. Please try again.`);
      console.error(error);
    }
  };

  // Pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFilter(!showFilter);
  };

  if (loading) {
    return (
      <div className="users-table-container">
        <div className="users-table__empty">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="users-table-container" data-testid="users-table">
      <table className="users-table">
        <thead className="users-table__header">
          <tr>
            <th
              className="users-table__header-cell"
              onClick={handleHeaderClick}
            >
              <div className="users-table__header-content">
                <span>ORGANIZATION</span>
                <Filter size={16} />
              </div>
            </th>
            <th
              className="users-table__header-cell"
              onClick={handleHeaderClick}
            >
              <div className="users-table__header-content">
                <span>USERNAME</span>
                <Filter size={16} />
              </div>
            </th>
            <th
              className="users-table__header-cell"
              onClick={handleHeaderClick}
            >
              <div className="users-table__header-content">
                <span>EMAIL</span>
                <Filter size={16} />
              </div>
            </th>
            <th
              className="users-table__header-cell"
              onClick={handleHeaderClick}
            >
              <div className="users-table__header-content">
                <span>PHONE NUMBER</span>
                <Filter size={16} />
              </div>
            </th>
            <th
              className="users-table__header-cell"
              onClick={handleHeaderClick}
            >
              <div className="users-table__header-content">
                <span>DATE JOINED</span>
                <Filter size={16} />
              </div>
            </th>
            <th
              className="users-table__header-cell"
              onClick={handleHeaderClick}
            >
              <div className="users-table__header-content">
                <span>STATUS</span>
                <Filter size={16} />
              </div>
            </th>
            <th className="users-table__header-cell"></th>
          </tr>
        </thead>
        <tbody className="users-table__body">
          {paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan={7} className="users-table__empty">
                No users found
              </td>
            </tr>
          ) : (
            paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td className="users-table__cell">{user.organization}</td>
                <td className="users-table__cell">{user.username}</td>
                <td className="users-table__cell">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="users-table__cell">{user.phoneNumber}</td>
                <td className="users-table__cell">{user.dateJoined}</td>
                <td className="users-table__cell">
                  <span
                    className={`users-table__status users-table__status--${user.status.toLowerCase()}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="users-table__cell users-table__actions">
                  <button
                    className="users-table__actions-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(
                        activeDropdown === user.id ? null : user.id,
                      );
                    }}
                    aria-label="User actions"
                    data-testid={`actions-button-${user.id}`}
                  >
                    <MoreVertical />
                  </button>
                  {activeDropdown === user.id && (
                    <div className="users-table__actions-dropdown">
                      <button
                        className="users-table__actions-item"
                        onClick={() => handleViewDetails(user.id)}
                      >
                        <Eye size={16} />
                        <span>View Details</span>
                      </button>
                      <button
                        className="users-table__actions-item"
                        onClick={() =>
                          handleStatusChange(
                            user.id,
                            user.fullName,
                            "Blacklisted",
                          )
                        }
                      >
                        <UserX size={16} />
                        <span>Blacklist User</span>
                      </button>
                      <button
                        className="users-table__actions-item"
                        onClick={() =>
                          handleStatusChange(user.id, user.fullName, "Active")
                        }
                      >
                        <UserCheck size={16} />
                        <span>Activate User</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="users-table__pagination">
        <div className="users-table__pagination-info">
          <span>Showing</span>
          <select
            className="users-table__pagination-select"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            data-testid="items-per-page"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span>out of {users.length}</span>
        </div>

        <div className="users-table__pagination-pages">
          <button
            className="users-table__pagination-button users-table__pagination-button--nav"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`users-table__pagination-button ${
                page === currentPage
                  ? "users-table__pagination-button--active"
                  : ""
              }`}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              disabled={typeof page === "string"}
            >
              {page}
            </button>
          ))}

          <button
            className="users-table__pagination-button users-table__pagination-button--nav"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {showFilter && (
        <FilterDropdown
          onFilter={handleFilter}
          onReset={handleReset}
          onClose={() => setShowFilter(false)}
          organizations={[...new Set(users.map((u) => u.organization))]}
        />
      )}
    </div>
  );
};
