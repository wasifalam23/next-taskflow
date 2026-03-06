"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskForm({ task }) {
	console.log("TASKS", task);
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setDescription(task.description);
		}
	}, [task]);

	const editHandler = async () => {
		const res = await fetch(`/api/tasks/${task._id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, description }),
		});

		if (!res.ok) {
			throw new Error("Failed to update task");
		}

		const data = await res.json();
		console.log("Data", data);
		router.push("/tasks");
	};

	const formSubmitHandler = async (e) => {
		e.preventDefault();

		if (!title.trim()) {
			alert("Title is required");
			return;
		}

		try {
			if (task) {
				await editHandler(task);
				return;
			}

			const res = await fetch("/api/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, description }),
			});

			if (!res.ok) {
				throw new Error("Failed to create task");
			}

			router.push("/tasks");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form onSubmit={formSubmitHandler} className="flex flex-col gap-3 mt-8">
			<div className="flex flex-col gap-2">
				<input
					className="p-2 border rounded-md"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Task title"
				/>
				<textarea
					className="p-2 border rounded-md"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description"
				/>
			</div>
			<button
				className="bg-blue-600 hover:bg-blue-500 rounded-md py-2 text-gray-50 cursor-pointer"
				type="submit">
				Create Task
			</button>
		</form>
	);
}
