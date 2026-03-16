"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

export default function TaskForm({ task }) {
	const router = useRouter();

	const [title, setTitle] = useState(task?.title || "");
	const [description, setDescription] = useState(task?.description || "");
	const [status, setStatus] = useState(task?.status || "todo");
	const [priority, setPriority] = useState(task?.priority || "medium");
	const [dueDate, setDueDate] = useState(task?.dueDate || "");

	const [titleError, setTitleError] = useState("");

	const editHandler = async () => {
		const res = await fetch(`/api/tasks/${task._id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, description, status, priority, dueDate }),
		});

		if (!res.ok) {
			throw new Error("Failed to update task");
		}

		toast.success("Task updated successfully");

		const data = await res.json();
		console.log("Data", data);
		router.push("/tasks");
	};

	const formSubmitHandler = async (e) => {
		e.preventDefault();

		if (!title.trim()) {
			setTitleError("Title is required");
			return;
		}

		try {
			if (task) {
				await editHandler();
				return;
			}

			const res = await fetch("/api/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, description, status, priority, dueDate }),
			});

			if (!res.ok) {
				throw new Error("Failed to create task");
			}

			toast.success("Task has been created");

			router.push("/tasks");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form onSubmit={formSubmitHandler} className="max-w-2xl mt-8 space-y-6">
			<div className="space-y-2">
				<Label htmlFor="title">Title</Label>

				<Input
					id="title"
					value={title}
					className={`py-4.5! ${titleError ? "border-red-500" : ""}`}
					onChange={(e) => {
						setTitle(e.target.value);
						if (titleError) setTitleError("");
					}}
					placeholder="Task title"
				/>

				{titleError && <p className="text-sm text-red-500">{titleError}</p>}
			</div>

			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>

				<Textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description"
					className="min-h-30"
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label>Status</Label>

					<Select value={status} onValueChange={setStatus}>
						<SelectTrigger className="w-full max-w-36">
							<SelectValue placeholder="Select status" />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value="todo">Todo</SelectItem>
							<SelectItem value="in-progress">In Progress</SelectItem>
							<SelectItem value="done">Done</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label>Priority</Label>

					<Select value={priority} onValueChange={setPriority}>
						<SelectTrigger className="w-full max-w-24">
							<SelectValue />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value="low">Low</SelectItem>
							<SelectItem value="medium">Medium</SelectItem>
							<SelectItem value="high">High</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="space-y-2 w-fit">
				<Label htmlFor="dueDate">Due Date</Label>

				<Input
					id="dueDate"
					type="date"
					value={dueDate}
					onChange={(e) => setDueDate(e.target.value)}
				/>
			</div>

			<div className="flex justify-end">
				<Button
					size="lg"
					variant="default"
					className=" cursor-pointer"
					type="submit">
					{task ? "Update Task" : "Create Task"}
				</Button>
			</div>
		</form>
	);
}
