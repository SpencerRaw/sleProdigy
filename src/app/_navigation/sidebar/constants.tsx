import { accountProfilePath, homePath, ticketsPath } from "@/path";
import { NavItem } from "./types";
import { LucideBook, LucideCircleUser, LucideLibrary } from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "所有诊断",
    icon: <LucideLibrary />,
    href: homePath(),
  },
  {
    title: "我的诊断",
    icon: <LucideBook />,
    href: ticketsPath(),
  },
  {
    separator: true,
    title: "账户",
    icon: <LucideCircleUser />,
    href: accountProfilePath(),
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
