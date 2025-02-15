import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  UserCog,
  ShoppingBasket,
  Group,
} from "lucide-react";
import { NavMain } from "@components/components/nav-main";
import { NavProjects } from "@components/components/nav-projects";
import { NavUser } from "@components/components/nav-user";
import { TeamSwitcher } from "@components/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@components/components/ui/sidebar";
import APP from "../../../dataCred.js";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Divyam",
      logo: GalleryVerticalEnd,
      plan: "Pvt Ltd",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Home",
      url: "http://localhost:5173/dashboard/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Home",
          url: `${APP?.APP_URL}/dashboard`,
        },
      ],
    },
    // ${APP && APP.APP_BACKEND_URL}/dashboard/package
    {
      title: "Orders",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All",
          url: `${APP?.APP_URL}/dashboard/order`,
        },
        ,
        {
          title: "Pending",
          url: `${APP?.APP_URL}/dashboard/order-pending`,
        },
        {
          title: "Complete",
          url: `${APP?.APP_URL}/dashboard/order-complete`,
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "All",
          url: `${APP?.APP_URL}/dashboard/users`,
        },
        {
          title: "Verified",
          url: `${APP?.APP_URL}/dashboard/verified-users`,
        },
      ],
    },
    // {
    //   title: "Product",
    //   url: `${APP?.APP_URL}/dashboard/product`,

    //   icon: ShoppingBasket,
    //   items: [
    //     {
    //       title: "Products",
    //       url: `${APP?.APP_URL}/dashboard/product`,
    //     },
    //     {
    //       title: "Add New Product",
    //       url: `${APP?.APP_URL}/dashboard/add-new-product`,
    //     },

    //     {
    //       title: "General",
    //       url: `${APP?.APP_URL}/dashboard/settings/general`,
    //     },
    //   ],
    // },

    {
      title: "Packages",
      url: `${APP?.APP_URL}/dashboard/package"`,
      icon: Group,
      items: [
        {
          title: "Packages",
          url: `${APP?.APP_URL}/dashboard/package`,
        },
        {
          title: "Add New Packages",
          url: `${APP?.APP_URL}/dashboard/add-new-package`,
        },
      ],
    },

    {
      title: "Employees",
      url: "#",
      icon: UserCog,
      items: [
        {
          title: "Employee",
          url: `${APP?.APP_URL}/dashboard/employee`,
        },
        {
          title: "Create new employee",
          url: `${APP?.APP_URL}/dashboard/new-employee`,
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: `${APP?.APP_URL}/dashboard/settings/general`,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
