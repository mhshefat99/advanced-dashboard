import { Link } from "react-router-dom";
import UserDropdownMenu from "./UserDropdownMenu";
import { SidebarTrigger } from "./ui/sidebar";
import ToggleTheme from "./ToggleTheme";

function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between border p-2">
      <SidebarTrigger className="-m-2" />
      <div className="flex items-center gap-4">
        <Link to="/">ADB Dashboard</Link>
        <ToggleTheme />
        <UserDropdownMenu />
      </div>
    </nav>
  );
}

export default Navbar;
