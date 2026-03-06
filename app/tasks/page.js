import Link from "next/link";

async function getTasks() {
	const res = await fetch("http://localhost:3000/api/tasks", {
		cache: "no-store",
	});

	const data = await res.json();
	return data.data;
}

export default async function TasksPage() {
	const tasks = await getTasks();

	return (
		<div className="px-8">
			<div className="flex items-center justify-between py-8">
				<h1 className="text-3xl font-medium">Tasks</h1>
				<Link
					href="/tasks/new"
					className="bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-md text-white">
					Create new task
				</Link>
			</div>

			{tasks.map((task) => (
				<div key={task._id} className="border p-4 rounded mb-3 ">
					<h2>{task.title}</h2>
					<p>{task.description}</p>

					<div>
						<span>{task.status}</span> | <span>{task.priority}</span>
					</div>
				</div>
			))}
		</div>
	);
}
