import { Outlet } from "react-router";
import { Header } from "./Header/header";
import { Sidebar } from "./Sidebar/sidebar";
import { useState } from "react";
import "./page-layout.scss";

export const PageLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="dashboard-layout" data-testid="dashboard-layout">
      <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="dashboard-layout__content">
        <Outlet />
      </main>
    </div>
  );
};
