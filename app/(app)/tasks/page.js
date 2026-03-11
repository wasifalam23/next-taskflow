import KanbanBoardClient from "@/components/kanban/KanbanBoardClient";
import { getTasks } from "@/lib/tasks";

export default async function TasksPage() {
	const tasks = await getTasks();

	return (
		<div className="py-8">
			<KanbanBoardClient tasks={tasks} />
		</div>
	);
}
