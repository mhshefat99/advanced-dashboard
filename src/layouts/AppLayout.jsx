import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SidebarProvider } from "@/components/ui/sidebar";
function AppLayout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SidebarProvider>
        <div className="font-roboto flex w-full justify-between">
          <aside>
            <AppSidebar />
          </aside>
          <main className="w-ful flex-1">
            <Navbar />
            <div className="px-2">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default AppLayout;
