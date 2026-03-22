type DueDate = Date | string | null | undefined;
type TaskStatus = 'todo' | 'in-progress' | 'done';

export const isOverdue = (dueDate: DueDate, status: TaskStatus): boolean => {
	if (!dueDate || status === 'done') return false;

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const taskDueDate = new Date(dueDate);
	taskDueDate.setHours(0, 0, 0, 0);

	return taskDueDate < today;
};
