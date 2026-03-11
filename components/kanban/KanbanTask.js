"use client";

import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent } from "@/components/ui/card";

export default function KanbanTask({ task }) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task._id,
	});

	const style = transform
		? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
		: undefined;

	return (
		<Card
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className="cursor-grab hover:bg-muted/40 transition-colors">
			<CardContent className="p-3">
				<p className="font-medium">{task.title}</p>
				{task.description && (
					<p className="text-sm text-muted-foreground mt-1">
						{task.description}
					</p>
				)}
			</CardContent>
		</Card>
	);
}
