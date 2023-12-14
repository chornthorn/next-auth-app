"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import {
  Contact,
  Container,
  FormInput,
  GanttChartSquare,
  Home,
  Layers3,
  LayoutDashboard,
  Library,
  LineChart,
  ListMusic,
  MessageSquarePlus,
  Mic2,
  Music2,
  Navigation,
  Receipt,
  Table,
  Truck,
  User,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  href?: string;
  icon?: React.ReactNode;
  items?: SidebarNavItem[];
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

const menu: SidebarNavItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    items: [
      {
        title: "Home",
        href: "/",
        icon: <Home size={16} />,
      },
      {
        title: "Form",
        href: "/dashboard/form",
        icon: <GanttChartSquare size={16} />,
      },
    ],
  },
  {
    title: "Users",
    icon: <Users size={18} />,
    items: [
      {
        title: "Employees",
        href: "/employees",
        icon: <Users size={16} />,
      },
      {
        title: "Applicants",
        href: "/applicants",
        icon: <Contact size={16} />,
      },
      {
        title: "Customers",
        href: "/customers",
        icon: <Container size={16} />,
      },
      {
        title: "Suppliers",
        href: "/suppliers",
        icon: <Truck size={16} />,
      },
    ],
  },
  {
    title: "Accounting",
    icon: <Navigation size={18} />,
    items: [
      {
        title: "Invoices",
        href: "/invoices",
        icon: <Receipt size={16} />,
      },
      {
        title: "Expenses",
        href: "/expenses",
        icon: <LineChart size={16} />,
      },
    ],
  },
  {
    title: "Reports",
    icon: <Layers3 size={18} />,
    items: [
      {
        title: "Sales",
        href: "/sales",
        icon: <ListMusic size={16} />,
      },
      {
        title: "Purchases",
        href: "/purchases",
        icon: <Mic2 size={16} />,
      },
      {
        title: "Stock",
        href: "/stock",
        icon: <Library size={16} />,
      },
      {
        title: "Payroll",
        href: "/payroll",
        icon: <Table size={16} />,
      },
    ],
  },
  {
    title: "Settings",
    icon: <Settings size={16} />,
    items: [
      {
        title: "Positions",
        href: "/positions",
        icon: <FormInput size={16} />,
      },

      {
        title: "Departments",
        href: "/departments",
        icon: <FormInput size={16} />,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: <User size={16} />,
      },
      {
        title: "Account",
        href: "/account",
        icon: <Music2 size={16} />,
      },
      {
        title: "Profile",
        href: "/profile",
        icon: <FormInput size={16} />,
      },
    ],
  },
];

export default function Sidebar({ className, onClick }: SidebarProps) {
  const pathName = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>("Dashboard");

  const toggleMenu = (title: string) => {
    setExpandedMenu((prevState) => (prevState === title ? null : title));
  };

  useEffect(() => {
    const currentMenu = menu.find(
      (item) => item.items?.some((subItem) => subItem.href === pathName),
    );
    if (currentMenu) {
      setExpandedMenu(currentMenu.title);
    }
  }, [pathName]);

  return (
    <div className={cn("flex h-full w-[240px] flex-col", className)}>
      <div className="flex h-16 w-full items-center justify-center gap-2 border-b text-lg font-medium p-4">
        <GitHubLogoIcon className="h-9 w-9" /> Prometeus KC
      </div>
      <div className="py-4">
        {menu.map((item, index) => (
          <div key={index} className="px-3 py-2">
            <h3
              className="mb-2 px-4 tracking-tight flex justify-between items-center cursor-pointer"
              onClick={() => toggleMenu(item.title)}
            >
              <div className="flex items-center gap-4 text-md font-medium text-gray-700 dark:text-gray-50 ">
                {item.icon}
                {item.title}
              </div>
              {expandedMenu === item.title ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </h3>
            <div
              className={
                expandedMenu === item.title
                  ? "transition-all duration-500 ease-in-out max-h-64 overflow-auto"
                  : "transition-all duration-500 ease-in-out max-h-0 overflow-hidden"
              }
            >
              {item.items ? (
                <SidebarItems
                  pathName={pathName}
                  onClick={onClick}
                  items={item.items}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarItems({
  items,
  pathName,
  onClick,
}: {
  onClick?: () => void;

  items: SidebarNavItem[];
  pathName: string | null;
}) {
  return (
    <div className="pl-4 space-y-4">
      {items.map((item, index) => (
        <Link key={index} href={item.href || "/"}>
          <div className="cursor-pointer my-2">
            <span
              className={cn(
                "flex items-center gap-3 my-1.5 py-1 px-2 rounded-md hover:bg-gray-200 transition-colors duration-200 dark:hover:bg-gray-700 dark:text-gray-50",
                pathName === item.href && "bg-gray-200 py-1 dark:bg-gray-700",
              )}
              onClick={onClick}
            >
              {item.icon}
              {item.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
