import { getTasks, getTaskStats } from "@/lib/tasks";
import Link from "next/link";
import { Plus } from "lucide-react";
import RecentTasks from "@/components/dashboard/RecentTasks";
import StatsCards from "@/components/dashboard/StatsCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
	const stats = await getTaskStats();
	const recentTasks = await getTasks(5);

	return (
		<div className="space-y-8">
			<StatsCards stats={stats} />
			<RecentTasks tasks={recentTasks} />

			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>

				<CardContent>
					<p className="text-sm text-muted-foreground mb-4">
						Create a new task quickly
					</p>

					<Link href="/tasks/new">
						<Button className="cursor-pointer">
							<Plus className="w-4 h-4 mr-2" />
							New Task
						</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
