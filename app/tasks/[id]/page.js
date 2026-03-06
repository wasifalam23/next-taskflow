import TaskForm from "@/components/TaskForm";

async function getTaskById(id) {
	const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch task");
	}

	const data = await res.json();
	return data.data;
}

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
