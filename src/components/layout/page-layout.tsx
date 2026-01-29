import { Outlet } from "react-router";
import { Header } from "./Header/header";
import { Sidebar } from "./Sidebar/sidebar";
import { useState } from "react";
import "./page-layout.scss";

export const PageLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="page-layout" data-testid="page-layout">
      <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isCollapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)} />

      <main className={`page-layout__content ${sidebarCollapsed ? "page-layout__content--sidebar-collapsed" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
};
