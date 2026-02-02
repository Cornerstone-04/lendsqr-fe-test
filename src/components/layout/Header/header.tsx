import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import LendsqrLogo from "@/assets/icons/lendsqr-logo.svg";
import "./header.scss";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const name = user?.name ?? "User";
  return (
    <header className="header" data-testid="header">
      <div className="header__left">
        <button
          className="header__menu-toggle"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
          data-testid="menu-toggle"
        >
          <Menu size={24} />
        </button>

        <div className="header__logo">
          <img src={LendsqrLogo} alt="Lendsqr Logo" />
        </div>

        <div className="header__search">
          <input
            type="text"
            className="header__search-input"
            placeholder="Search for anything"
            data-testid="search-input"
          />
          <button className="header__search-button" data-testid="search-button">
            <Search size={16} />
          </button>
        </div>
      </div>

      <div className="header__right">
        <span className="header__docs">Docs</span>

        <button className="header__notifications" aria-label="Notifications">
          <Bell size={22} />
        </button>

        <div className="header__user">
          <div className="header__user-avatar">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              alt="User avatar"
            />
          </div>
          <span className="header__user-name">{name}</span>
          <ChevronDown size={16} className="header__user-dropdown" />
        </div>
      </div>
    </header>
  );
};
