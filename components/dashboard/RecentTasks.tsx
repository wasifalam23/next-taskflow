import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { statusStyles } from '@/lib/taskStyles';
import type { Task } from '@/types/task';

type RecentTasksProps = {
	tasks: Pick<Task, '_id' | 'title' | 'status' | 'createdAt' | 'completedAt'>[];
};

export default function RecentTasks({ tasks }: RecentTasksProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Recent Tasks</CardTitle>
				<Link
					href="/tasks"
					className="text-sm text-muted-foreground hover:underline">
					View all
				</Link>
			</CardHeader>

			<CardContent className="divide-y">
				{tasks.length === 0 && (
					<div className="py-6 text-center text-sm text-muted-foreground">
						No tasks yet
					</div>
				)}

				{tasks.map((task) => {
					const date =
						task.status === 'done' && task.completedAt
							? task.completedAt
							: task.createdAt;

					const formattedDate = new Date(date).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
					});

					const statusLabel =
						task.status === 'in-progress'
							? 'In Progress'
							: task.status.charAt(0).toUpperCase() + task.status.slice(1);

					return (
						<div
							key={task._id}
							className="flex items-center justify-between gap-4 py-3 px-2 rounded-md hover:bg-muted transition-colors">
							<span className="font-medium truncate flex-1 min-w-0">
								{task.title}
							</span>

							<div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
								<Badge className={statusStyles[task.status]}>
									{statusLabel}
								</Badge>

								<span>{formattedDate}</span>
							</div>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}
