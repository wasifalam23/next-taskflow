import { getTasks } from "@/lib/tasks";
import TasksView from "@/components/tasks/TasksView";

export default async function TasksPage() {
	const tasks = await getTasks();

	return (
		<div className="pb-8 pt-4">
			<TasksView tasks={tasks} />
		</div>
	);
}
