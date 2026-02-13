import { Outlet } from "react-router-dom";
import TopNav from "@/components/TopNav";

const AppShell = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <Outlet />
    </div>
  );
};

export default AppShell;
