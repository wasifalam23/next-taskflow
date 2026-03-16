import {
	SidebarProvider,
	SidebarTrigger,
	SidebarInset,
} from "@/components/ui/sidebar";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { AppSidebar } from "@/components/app-sidebar";

export default function AppLayout({ children }) {
	return (
		<SidebarProvider>
			<div className="flex h-screen w-full">
				<AppSidebar />
				<div className="flex flex-col flex-1">
					<main className="flex-1 p-6 overflow-y-auto">
						<Tooltip>
							<TooltipTrigger asChild>
								<SidebarTrigger className="cursor-w-resize" />
							</TooltipTrigger>

							<TooltipContent>
								<p className="font-bold">Close sidebar</p>
							</TooltipContent>
						</Tooltip>
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
