"use client";

import { useDroppable } from "@dnd-kit/core";
import KanbanTask from "./KanbanTask";
import { columnStyles } from "@/lib/taskStyles";

export default function KanbanColumn({ title, tasks, status }) {
	const { setNodeRef } = useDroppable({
		id: status,
	});

	return (
		<div ref={setNodeRef} className="bg-muted/40 space-y-2 rounded-lg p-4 ">
			<div className={`px-3 py-2.5 rounded-md border ${columnStyles[status]}`}>
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-semibold">{title}</h3>
					<span className="text-xs opacity-70">{tasks.length}</span>
				</div>
			</div>

			<div className="space-y-3">
				{tasks.map((task) => (
					<KanbanTask key={task._id} task={task} />
				))}
			</div>
		</div>
	);
}
