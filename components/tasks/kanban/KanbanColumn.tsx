'use client';

import { useDroppable } from '@dnd-kit/core';
import KanbanTask from './KanbanTask';
import { columnStyles } from '@/lib/taskStyles';
import type { Task, TaskStatus } from '@/types/task';

type KanbanColumnProps = {
	title: string;
	tasks: Task[];
	status: TaskStatus;
};

export default function KanbanColumn({
	title,
	tasks,
	status,
}: KanbanColumnProps) {
	const { setNodeRef } = useDroppable({
		id: status,
	});

	return (
		<div
			ref={setNodeRef}
			className=" bg-muted/40 space-y-2 rounded-lg p-4 min-w-[75vw] sm:min-w-75 md:min-w-[320px] snap-start">
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
