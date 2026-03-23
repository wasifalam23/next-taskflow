export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
	_id: string;
	title: string;
	description?: string;
	status: TaskStatus;
	priority: TaskPriority;
	dueDate?: Date | string | null;
	completedAt?: Date | string | null;
	createdAt: Date | string;
	updatedAt: Date | string;
	userId: string;
};
