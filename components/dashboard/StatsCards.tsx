import { ListTodo, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatsCardsProps = {
	stats: {
		total: number;
		completed: number;
		pending: number;
		overdue: number;
	};
};

export default function StatsCards({ stats }: StatsCardsProps) {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
			<Card>
				<CardHeader className="flex items-center justify-between pb-2">
					<CardTitle className="text-sm text-muted-foreground">
						Total Tasks
					</CardTitle>
					<ListTodo className="h-4 w-4 text-slate-500" />
				</CardHeader>

				<CardContent>
					<div className="text-3xl font-bold">{stats.total}</div>
					<p className="text-xs text-muted-foreground">
						All tasks in your workspace
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex items-center justify-between pb-2">
					<CardTitle className="text-sm text-muted-foreground">
						Completed
					</CardTitle>
					<CheckCircle2 className="h-4 w-4 text-green-600" />
				</CardHeader>

				<CardContent>
					<div className="text-3xl font-bold">{stats.completed}</div>
					<p className="text-xs text-muted-foreground">
						Tasks finished successfully
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex items-center justify-between pb-2">
					<CardTitle className="text-sm text-muted-foreground">
						Pending
					</CardTitle>
					<Clock className="h-4 w-4 text-orange-500" />
				</CardHeader>

				<CardContent>
					<div className="text-3xl font-bold">{stats.pending}</div>
					<p className="text-xs text-muted-foreground">
						Waiting to be completed
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex items-center justify-between pb-2">
					<CardTitle className="text-sm text-muted-foreground">
						Overdue
					</CardTitle>
					<AlertCircle className="h-4 w-4 text-red-500" />
				</CardHeader>

				<CardContent>
					<p className="text-3xl font-bold">{stats.overdue}</p>
					<p className="text-xs text-muted-foreground">
						Tasks past their deadline
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
