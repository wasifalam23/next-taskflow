export const isOverdue = (dueDate, status) => {
	if (!dueDate || status === "done") return false;

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const taskDueDate = new Date(dueDate);
	taskDueDate.setHours(0, 0, 0, 0);

	return taskDueDate < today;
};
