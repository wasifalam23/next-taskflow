"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

			toast.success("Task deleted");
			router.refresh();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" size="icon" className="cursor-pointer">
					<Trash className="w-4 h-4 text-red-500" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the task.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="cursor-pointer">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={deleteTaskHandler}
						className="bg-red-500 hover:bg-red-600 cursor-pointer">
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
