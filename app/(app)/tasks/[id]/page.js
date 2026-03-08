import { getTaskById } from "@/lib/tasks";
import TaskForm from "@/components/tasks/TaskForm";

export default async function EditTaskPage({ params }) {
	const { id } = await params;

	const task = await getTaskById(id);

	return (
		<div className="max-w-6xl mx-auto">
			<h1>Edit Task</h1>
			<TaskForm task={task} />
		</div>
	);
}
