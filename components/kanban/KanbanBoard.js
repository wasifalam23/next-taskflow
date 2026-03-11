"use client";

import { DndContext } from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import { useState } from "react";

export default function KanbanBoard({ tasks }) {
	const [items, setItems] = useState(tasks);

	const columns = {
		todo: items.filter((t) => t.status === "todo"),
		"in-progress": items.filter((t) => t.status === "in-progress"),
		done: items.filter((t) => t.status === "done"),
	};

	const handleDragEnd = async (event) => {
		const { active, over } = event;

		if (!over) return;

		// console.log(event);

		const taskId = active.id;
		const newStatus = over.id;

		const movedTask = items.find((t) => t._id.toString() === taskId.toString());

		if (!movedTask) return;

		// ✅ Ignore drop if same column
		if (movedTask.status === newStatus) {
			return;
		}

		setItems((prev) => {
			const movedTask = prev.find((t) => String(t._id) === String(taskId));
			if (!movedTask) return prev;

			const remaining = prev.filter((t) => String(t._id) !== String(taskId));

			const updatedTask = { ...movedTask, status: newStatus };

			// put moved task at the beginning
			return [updatedTask, ...remaining];
		});

		// update backend
		await fetch(`/api/tasks/${taskId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ status: newStatus }),
		});
	};

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className="grid grid-cols-3 gap-6 px-8">
				<KanbanColumn title="Todo" tasks={columns.todo} status="todo" />
				<KanbanColumn
					title="In Progress"
					tasks={columns["in-progress"]}
					status="in-progress"
				/>
				<KanbanColumn title="Done" tasks={columns.done} status="done" />
			</div>
		</DndContext>
	);
}
