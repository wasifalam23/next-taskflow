'use client';

import { useRouter } from 'next/navigation';
import {
	DndContext,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import { useState, useEffect } from 'react';
import type { Task, TaskStatus } from '@/types/task';

type KanbanBoardProps = {
	tasks: Task[];
};

export default function KanbanBoard({ tasks }: KanbanBoardProps) {
	const [items, setItems] = useState(tasks);

	const router = useRouter();

	useEffect(() => {
		setItems(tasks);
	}, [tasks]);

	const columns = {
		todo: items.filter((t) => t.status === 'todo'),
		'in-progress': items.filter((t) => t.status === 'in-progress'),
		done: items.filter((t) => t.status === 'done'),
	};

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) return;

		const taskId = active.id;
		const newStatus = over.id as TaskStatus;

		const movedTask = items.find((t) => t._id.toString() === taskId.toString());

		if (!movedTask) return;

		if (movedTask.status === newStatus) {
			return;
		}

		setItems((prev) => {
			const movedTask = prev.find((t) => String(t._id) === String(taskId));
			if (!movedTask) return prev;

			const remaining = prev.filter((t) => String(t._id) !== String(taskId));

			const updatedTask = { ...movedTask, status: newStatus };

			return [updatedTask, ...remaining];
		});

		await fetch(`/api/tasks/${taskId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status: newStatus }),
		});

		router.refresh();
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 1000,
				tolerance: 5,
			},
		}),
	);

	return (
		<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
			<div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible snap-x snap-mandatory">
				<KanbanColumn title="Todo" tasks={columns.todo} status="todo" />
				<KanbanColumn
					title="In Progress"
					tasks={columns['in-progress']}
					status="in-progress"
				/>
				<KanbanColumn title="Done" tasks={columns.done} status="done" />
			</div>
		</DndContext>
	);
}
