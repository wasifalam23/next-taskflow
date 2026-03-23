'use client';

import { useDraggable } from '@dnd-kit/core';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { priorityStyles } from '@/lib/taskStyles';
import { formatDate } from '@/lib/formatDate';
import { isOverdue } from '@/lib/helpers';
import type { Task } from '@/types/task';

type KanbanTaskProps = {
	task: Task;
};

export default function KanbanTask({ task }: KanbanTaskProps) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task._id,
	});

	const style = transform
		? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
		: undefined;

	const overdue = isOverdue(task.dueDate, task.status);

	return (
		<Card
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className="cursor-grab active:cursor-grabbing hover:bg-muted/40 transition-colors">
			<CardContent className="py-2 space-y-3">
				<div className="space-y-2">
					<h4 className="text-sm font-semibold leading-snug">{task.title}</h4>
					{task.description && (
						<p className="text-xs text-muted-foreground line-clamp-1">
							{task.description}
						</p>
					)}
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between text-xs">
					<Badge className={priorityStyles[task.priority]}>
						{task.priority}
					</Badge>

					{task.dueDate && (
						<div
							className={`flex items-center gap-1 text-xs ${
								overdue ? 'text-red-600' : 'text-muted-foreground'
							}`}>
							<Calendar className="w-3 h-3" />
							Due {formatDate(task.dueDate)}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
