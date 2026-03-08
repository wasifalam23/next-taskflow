import {
	SidebarProvider,
	SidebarTrigger,
	SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AppLayout({ children }) {
	return (
		<SidebarProvider>
			<div className="flex h-screen w-full">
				<AppSidebar />
				<div className="flex flex-col flex-1">
					{/* <Topbar /> */}

					<main className="flex-1 p-6 overflow-y-auto">
						<SidebarTrigger />
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
