import { SidebarProvider } from "@/components/ui/sidebar";

import SidebarToggleButton from "@/components/SidebarToggleButton";
import { AppSidebar } from "@/components/app-sidebar";

export default function AppLayout({ children }) {
	return (
		<SidebarProvider>
			<div className="flex h-screen w-full">
				<AppSidebar />
				<div className="flex flex-col flex-1">
					<main className="flex-1 overflow-y-auto p-6">
						<SidebarToggleButton />
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
