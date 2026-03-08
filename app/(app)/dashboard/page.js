import { getTaskStats } from "@/lib/tasks";

export default async function DashboardPage() {
	const stats = await getTaskStats();

	return (
		<div className="max-w-6xl mx-auto mt-10">
			<h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

			<div className="grid grid-cols-4 gap-4">
				<div className="p-4 border rounded">
					<p>Total Tasks</p>
					<h2 className="text-xl font-bold">{stats.total}</h2>
				</div>

				<div className="p-4 border rounded">
					<p>Completed</p>
					<h2 className="text-xl font-bold">{stats.completed}</h2>
				</div>

				<div className="p-4 border rounded">
					<p>Pending</p>
					<h2 className="text-xl font-bold">{stats.pending}</h2>
				</div>

				<div className="p-4 border rounded">
					<p>Overdue</p>
					<h2 className="text-xl font-bold">{stats.overdue}</h2>
				</div>
			</div>
		</div>
	);
}
