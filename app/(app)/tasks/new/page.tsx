import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';

import TaskForm from '@/components/tasks/TaskForm';

export default async function NewTaskPage() {
	const session = await getServerSession(authOptions);

	// 🔥 Protect route
	if (!session) {
		redirect('/login');
	}

	return (
		<div className="max-w-6xl mx-auto mt-4">
			<h1>Create Task</h1>
			<TaskForm />
		</div>
	);
}
