"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function DeleteTaskButton({ id }) {
	const router = useRouter();

	const deleteTaskHandler = async () => {
		try {
			const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });

			if (!res.ok) {
				throw new Error("Failed to delete task");
			}

			router.refresh();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Button
			className="cursor-pointer"
			onClick={deleteTaskHandler}
			size="icon"
			variant="ghost">
			<Trash className="w-4 h-4 text-red-500" />
		</Button>
	);
}
