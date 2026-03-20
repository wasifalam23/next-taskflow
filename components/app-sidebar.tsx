"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarFooter,
} from "@/components/ui/sidebar";

import { LayoutDashboard, ListTodo, Plus } from "lucide-react";

export function AppSidebar() {
	const pathname = usePathname();
	const { data: session } = useSession();

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

			<SidebarFooter className="border-t p-4">
				<DropdownMenu>
					<DropdownMenuTrigger
						className="cursor-pointer focus:outline-none"
						asChild>
						<button className="flex items-center gap-3 w-full">
							{/* Avatar */}
							<div className="w-10 h-10 relative">
								<Image
									src={session?.user?.image || "/default-avatar.jpg"}
									alt="User"
									fill
									sizes="40px"
									className="rounded-full object-cover border"
								/>
							</div>

							{/* Name */}
							<div className="flex flex-col text-left overflow-hidden">
								<p className="text-sm font-medium truncate">
									{session?.user?.name}
								</p>
								<p className="text-xs text-muted-foreground truncate">
									{session?.user?.email}
								</p>
							</div>
						</button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end" className="w-48">
						<DropdownMenuItem
							onClick={() => signOut({ callbackUrl: "/login" })}
							className="cursor-pointer text-red-500">
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
