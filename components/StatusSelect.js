"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StatusSelect({ task }) {
	const router = useRouter();
	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(task.status);

	const handleStatusChange = async (e) => {
		const newStatus = e.target.value;
		setStatus(newStatus);

		try {
			const res = await fetch(`/api/tasks/${task._id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status: newStatus }),
			});

			if (!res.ok) {
				throw new Error("Failed to update status");
			}

			setEditMode(false);
			router.refresh();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			{!editMode && (
				<button
					className="cursor-pointer"
					onDoubleClick={() => setEditMode(true)}>
					Status: {status}
				</button>
			)}

			{editMode && (
				<select
					autoFocus
					value={status}
					onChange={handleStatusChange}
					onBlur={() => setEditMode(false)}
					className="border rounded-md p-2">
					<option value="todo">Todo</option>
					<option value="in-progress">In Progress</option>
					<option value="done">Done</option>
				</select>
			)}
		</>
	);
}
