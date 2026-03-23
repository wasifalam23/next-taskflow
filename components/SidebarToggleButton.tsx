"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SidebarToggleButton() {
	const { open } = useSidebar();

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<SidebarTrigger
					className={open ? "cursor-w-resize" : "cursor-e-resize"}
				/>
			</TooltipTrigger>

			<TooltipContent>
				<p className="font-bold">{open ? "Close sidebar" : "Open sidebar"}</p>
			</TooltipContent>
		</Tooltip>
	);
}
