import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

import { getTaskById } from '@/lib/tasks';
import TaskForm from '@/components/tasks/TaskForm';

type EditTaskPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function EditTaskPage({ params }: EditTaskPageProps) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	const { id } = await params;

	const task = await getTaskById(id);
	const taskData = JSON.parse(JSON.stringify(task));

	return (
		<div className="max-w-6xl mx-auto">
			<h1>Edit Task</h1>
			<TaskForm task={taskData} />
		</div>
	);
}
