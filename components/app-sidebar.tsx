"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarFooter,
} from "@/components/ui/sidebar";

import { LayoutDashboard, ListTodo, Plus } from "lucide-react";

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader className="px-6 py-5 text-xl font-bold tracking-tight">
				TaskFlow
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup className="mt-2">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								size="lg"
								asChild
								isActive={pathname === "/dashboard"}
								className="text-base  hover:bg-slate-200 data-[active=true]:bg-indigo-50 data-[active=true]:text-indigo-600">
								<Link href="/dashboard" className="flex items-center gap-2">
									<LayoutDashboard size={18} className="text-slate-500" />
									<span>Dashboard</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>

						<SidebarMenuItem>
							<SidebarMenuButton
								size="lg"
								asChild
								isActive={pathname === "/tasks"}
								className="text-base  hover:bg-slate-200 data-[active=true]:bg-indigo-50 data-[active=true]:text-indigo-600">
								<Link href="/tasks" className="flex items-center gap-2">
									<ListTodo size={18} className="text-slate-500" />
									<span>Tasks</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>

						<SidebarMenuItem>
							<SidebarMenuButton
								size="lg"
								asChild
								isActive={pathname === "/tasks/new"}
								className="text-base  hover:bg-slate-200 data-[active=true]:bg-indigo-50 data-[active=true]:text-indigo-600">
								<Link href="/tasks/new" className="flex items-center gap-2">
									<Plus size={18} className="text-slate-500" />
									<span>New Task</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-t p-4 text-sm text-muted-foreground">
				TaskFlow v1
			</SidebarFooter>
		</Sidebar>
	);
}
