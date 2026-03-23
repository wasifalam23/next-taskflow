'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { statusStyles } from '@/lib/taskStyles';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';

import type { Task, TaskStatus } from '@/types/task';

type StatusSelectProps = {
	task: Task;
};

export default function StatusSelect({ task }: StatusSelectProps) {
	const router = useRouter();
	const [status, setStatus] = useState(task.status);

	const handleStatusChange = async (newStatus: TaskStatus) => {
		const previousStatus = status;

		setStatus(newStatus);

		try {
			const res = await fetch(`/api/tasks/${task._id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status: newStatus }),
			});

			if (!res.ok) {
				throw new Error('Failed to update status');
			}

			router.refresh();
		} catch (err) {
			console.error(err);
			setStatus(previousStatus);
		}
	};

	return (
		<Select value={status} onValueChange={handleStatusChange}>
			<SelectTrigger
				className={`h-7 w-32.5 text-xs cursor-pointer ${statusStyles[status]}`}>
				<SelectValue />
			</SelectTrigger>

			<SelectContent>
				<SelectItem value="todo">Todo</SelectItem>
				<SelectItem value="in-progress">In Progress</SelectItem>
				<SelectItem value="done">Done</SelectItem>
			</SelectContent>
		</Select>
	);
}
