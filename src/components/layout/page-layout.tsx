import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar/sidebar";
import { Topbar } from "./Topbar/topbar";

export const PageLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
