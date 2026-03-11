"use client";

import { useDroppable } from "@dnd-kit/core";
import KanbanTask from "./KanbanTask";

export default function KanbanColumn({ title, tasks, status }) {
	const { setNodeRef } = useDroppable({
		id: status,
	});

	return (
		<div ref={setNodeRef} className="bg-muted/40 rounded-lg p-4">
			<h2 className="font-semibold mb-4">{title}</h2>

			<div className="space-y-3">
				{tasks.map((task) => (
					<KanbanTask key={task._id} task={task} />
				))}
			</div>
		</div>
	);
}
