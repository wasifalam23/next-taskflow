'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import { useState } from 'react';

import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarFooter,
} from '@/components/ui/sidebar';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { LayoutDashboard, ListTodo, Plus } from 'lucide-react';

export function AppSidebar() {
	const [openLogoutAlert, setOpenLogoutAlert] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const pathname = usePathname();
	const { data: session } = useSession();

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);

			await signOut({
				callbackUrl: '/login',
				redirect: true, // default but keep it explicit
			});
		} catch (err) {
			console.error(err);
			setIsLoggingOut(false); // fallback (rare case)
		}
	};

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
								isActive={pathname === '/dashboard'}
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
								isActive={pathname === '/tasks'}
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
								isActive={pathname === '/tasks/new'}
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
							<div className="w-10 h-10 relative">
								<Image
									src={session?.user?.image || '/default-avatar.jpg'}
									alt="User"
									fill
									sizes="40px"
									className="rounded-full object-cover border"
								/>
							</div>

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
							onClick={() => setOpenLogoutAlert(true)}
							className="cursor-pointer text-red-500">
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<AlertDialog
					open={openLogoutAlert}
					onOpenChange={(val) => {
						if (!isLoggingOut) setOpenLogoutAlert(val);
					}}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you sure you want to log out?
							</AlertDialogTitle>
							<AlertDialogDescription>
								{`Log out of TaskFlow as ${session?.user?.email}?`}
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel
								className="cursor-pointer"
								disabled={isLoggingOut}>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleLogout}
								disabled={isLoggingOut}
								className="bg-red-500 hover:bg-red-600 cursor-pointer flex items-center gap-2">
								{isLoggingOut ? (
									<>
										<span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
										Logging out...
									</>
								) : (
									'Log out'
								)}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</SidebarFooter>
		</Sidebar>
	);
}
