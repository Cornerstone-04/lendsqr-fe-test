import React, { useState } from "react";
import { type UserFilters, type UserStatus } from "@/types/user.types";
import "./filter-dropdown.scss";

interface FilterDropdownProps {
  onFilter: (filters: UserFilters) => void;
  onReset: () => void;
  onClose: () => void;
  organizations: string[];
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  onFilter,
  onReset,
  onClose,
  organizations,
}) => {
  const [filters, setFilters] = useState<UserFilters>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  const handleChange = (field: keyof UserFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
    onReset();
  };

  return (
    <>
      <div className="filter-dropdown__overlay" onClick={onClose} />
      <div className="filter-dropdown">
        <form className="filter-dropdown__form" onSubmit={handleSubmit}>
          <div className="filter-dropdown__field">
            <label className="filter-dropdown__label" htmlFor="organization">
              Organization
            </label>
            <select
              id="organization"
              className="filter-dropdown__select"
              value={filters.organization}
              onChange={(e) => handleChange("organization", e.target.value)}
            >
              <option value="">Select</option>
              {organizations.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-dropdown__field">
            <label className="filter-dropdown__label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="filter-dropdown__input"
              placeholder="User"
              value={filters.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          </div>

          <div className="filter-dropdown__field">
            <label className="filter-dropdown__label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="filter-dropdown__input"
              placeholder="Email"
              value={filters.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="filter-dropdown__field">
            <label className="filter-dropdown__label" htmlFor="date">
              Date
            </label>
            <div className="filter-dropdown__date-input">
              <input
                id="date"
                type="date"
                className="filter-dropdown__input"
                value={filters.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
          </div>

          <div className="filter-dropdown__field">
            <label className="filter-dropdown__label" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              className="filter-dropdown__input"
              placeholder="Phone Number"
              value={filters.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </div>

          <div className="filter-dropdown__field">
            <label className="filter-dropdown__label" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className="filter-dropdown__select"
              value={filters.status}
              onChange={(e) =>
                handleChange("status", e.target.value as UserStatus | "")
              }
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Blacklisted">Blacklisted</option>
            </select>
          </div>

          <div className="filter-dropdown__actions">
            <button
              type="button"
              className="filter-dropdown__button filter-dropdown__button--reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="filter-dropdown__button filter-dropdown__button--filter"
            >
              Filter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
