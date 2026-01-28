import React from "react";
import { NavLink, useNavigate } from "react-router";
import {
  Briefcase,
  Home,
  Users,
  UserCheck,
  Coins,
  CircleDollarSign,
  PiggyBank,
  HandCoins,
  UserX,
  Building2,
  BadgePercent,
  ScrollText,
  CreditCard,
  Layers3,
  Settings2,
  BadgeDollarSign,
  ClipboardList,
  ChevronDown,
  LogOut,
  MessagesSquare,
  FileChartColumnIncreasing,
} from "lucide-react";
import "./sidebar.scss";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const customerItems = [
    { path: "/users", label: "Users", icon: Users },
    { path: "/guarantors", label: "Guarantors", icon: UserCheck },
    { path: "/loans", label: "Loans", icon: Coins },
    {
      path: "/decision-models",
      label: "Decision Models",
      icon: CircleDollarSign,
    },
    { path: "/savings", label: "Savings", icon: PiggyBank },
    {
      path: "/loan-requests",
      label: "Loan Requests",
      icon: HandCoins,
    },
    { path: "/whitelist", label: "Whitelist", icon: UserX },
    { path: "/karma", label: "Karma", icon: UserX },
  ];

  const businessItems = [
    { path: "/organization", label: "Organization", icon: Building2 },
    {
      path: "/loan-products",
      label: "Loan Products",
      icon: HandCoins,
    },
    {
      path: "/savings-products",
      label: "Savings Products",
      icon: BadgePercent,
    },
    {
      path: "/fees-charges",
      label: "Fees and Charges",
      icon: ScrollText,
    },
    {
      path: "/transactions",
      label: "Transactions",
      icon: CreditCard,
    },
    { path: "/services", label: "Services", icon: Layers3 },
    {
      path: "/service-account",
      label: "Service Account",
      icon: Settings2,
    },
    {
      path: "/settlements",
      label: "Settlements",
      icon: BadgeDollarSign,
    },
    {
      path: "/reports",
      label: "Reports",
      icon: FileChartColumnIncreasing,
    },
  ];

  const settingsItems = [
    { path: "/preferences", label: "Preferences", icon: Settings2 },
    {
      path: "/fees-pricing",
      label: "Fees and Pricing",
      icon: BadgeDollarSign,
    },
    { path: "/audit-logs", label: "Audit Logs", icon: ClipboardList },
    {
      path: "/system-messages",
      label: "Systems Messages",
      icon: MessagesSquare,
    },
  ];

  const renderNavItems = (items: typeof customerItems) => (
    <ul className="sidebar__nav">
      {items.map((item) => (
        <li key={item.path} className="sidebar__nav-item">
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `sidebar__nav-link ${isActive ? "sidebar__nav-link--active" : ""}`
            }
            onClick={onClose}
          >
            <item.icon />
            <span>{item.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {isOpen && <div className="sidebar__overlay" onClick={onClose} />}
      <aside
        className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
        data-testid="sidebar"
      >
        <div className="sidebar__switch-org">
          <Briefcase size={16} />
          <span>Switch Organization</span>
          <ChevronDown size={16} />
        </div>

        <nav className="sidebar__nav-item">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `sidebar__nav-link ${isActive ? "sidebar__nav-link--active" : ""}`
            }
            onClick={onClose}
          >
            <Home size={16} />
            <span>Dashboard</span>
          </NavLink>
        </nav>

        <div className="sidebar__section">
          <h3 className="sidebar__section-title">CUSTOMERS</h3>
          {renderNavItems(customerItems)}
        </div>

        <div className="sidebar__section">
          <h3 className="sidebar__section-title">BUSINESSES</h3>
          {renderNavItems(businessItems)}
        </div>

        <div className="sidebar__section">
          <h3 className="sidebar__section-title">SETTINGS</h3>
          {renderNavItems(settingsItems)}
        </div>

        <div className="sidebar__logout">
          <button className="sidebar__nav-link" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

        <div className="sidebar__version">v1.2.0</div>
      </aside>
    </>
  );
};
