import { getTasks, getTaskStats } from "@/lib/tasks";

import RecentTasks from "@/components/dashboard/RecentTasks";
import StatsCards from "@/components/dashboard/StatsCards";

export default async function DashboardPage() {
	const stats = await getTaskStats();
	const recentTasks = await getTasks(5);

	return (
		<div className="space-y-8">
			<StatsCards stats={stats} />
			<RecentTasks tasks={recentTasks} />
		</div>
	);
}
