import Link from "next/link";
import DeleteTaskButton from "./DeleteTaskButton";

export default function TaskCard({ task }) {
	return (
		<li className="border rounded-lg p-4 flex justify-between items-start">
			<div>
				<h3 className="font-semibold">{task.title}</h3>
				<p className="text-sm text-gray-600">{task.description}</p>

				<div className="flex gap-3 mt-2 text-sm">
					<span>Status: {task.status}</span>
					<span>Priority: {task.priority}</span>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<Link
					href={`/tasks/${task._id}`}
					className="px-3 py-1.5 rounded-md cursor-pointer bg-gray-600 hover:bg-gray-500 text-gray-50">
					Edit
				</Link>
				<DeleteTaskButton id={task._id} />
			</div>
		</li>
	);
}
