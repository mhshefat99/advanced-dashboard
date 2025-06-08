import {
  House,
  Users,
  ShoppingBasket,
  BaggageClaim,
  Inbox,
} from "lucide-react";
export const sidebarItems = [
  {
    name: "Home",
    url: "/",
    icon: House,
    color: "#06d6a0",
  },
  {
    name: "Products",
    url: "/products",
    icon: ShoppingBasket,
    color: "#38b000",
  },
  {
    name: "Users",
    url: "/users",
    icon: Users,
    color: "#219ebc",
  },
  {
    name: "Orders",
    url: "/orders",
    icon: BaggageClaim,
    color: "#ef476f",
  },
  {
    name: "Inbox",
    url: "#",
    icon: Inbox,
    color: "#8ecae6",
  },
];
