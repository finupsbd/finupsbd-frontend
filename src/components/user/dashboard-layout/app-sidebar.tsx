"use client";

import { Frame, PieChart, Settings2, SquareTerminal } from "lucide-react";
import * as React from "react";

import SiteLogo from "@/components/sheared/SiteLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/user/dashboard-layout/nav-main";
import Link from "next/link";
import { navList } from "./dashboard-navlist";
import { NavItems } from "./nav-items";
import { NavUser } from "./nav-user";
import { usePathname } from "next/navigation";






export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  return (
    <div className="z-50 ">
      <Sidebar
        className="w-72 shadow-lg transition-all "
        collapsible="icon"
        {...props}
      >
        {/* Header */}
        <SidebarHeader className="border-b 0 p-4 ">
          <SiteLogo className="w-36" />
        </SidebarHeader>

        {/* Main Content */}
        <SidebarContent className="flex-1 overflow-y-auto">
          {/* Profile*/}
          <NavMain items={navList.navMain} />
          {/* my items*/}
          <NavItems items={navList.myItems} />

          {/* Seetings */}
          {navList.settings && (
            <div className="mt-4 border-t border-gray-200 px-4 py-3 dark:border-gray-700">
              <h3 className="text-xs font-semibold uppercase text-gray-500">
                Settings
              </h3>
              <div className="mt-2 space-y-1">
                {navList.settings.map((settings, index) => {
                  const isActive = pathname === settings.url // or use pathname.startsWith(settings.url) for partial match

                  return (
                    <Link
                      key={index}
                      href={settings.url}
                      className={`flex items-center space-x-2 rounded-md p-2 transition-colors ${isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                      <settings.icon
                        className={`h-5 w-5 ${isActive ? "text-primary" : "text-gray-500"
                          }`}
                      />
                      <span
                        className={`text-sm ${isActive ? "text-primary" : "text-black dark:text-gray-300"
                          }`}
                      >
                        {settings.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Others */}
          {navList.others && (
            <div className="mt-4 border-t border-gray-200 px-4 py-3 dark:border-gray-700">
              <h3 className="text-xs font-semibold uppercase text-gray-500">
                Others
              </h3>
              <div className="mt-2 space-y-1">
                {navList.others.map((project, index) => {
                  const isActive = pathname === project.url

                  return (
                    <Link
                      key={index}
                      href={project.url}
                      className={`flex items-center space-x-2 rounded-md p-2 transition-colors ${isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                      <project.icon
                        className={`h-5 w-5 ${isActive ? "text-primary" : "text-gray-500"
                          }`}
                      />
                      <span
                        className={`text-sm ${isActive ? "text-primary" : "text-black dark:text-gray-300"
                          }`}
                      >
                        {project.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="border-t border-gray-200 p-4 dark:border-gray-700">
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
