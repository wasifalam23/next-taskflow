import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import { Task } from "@/models/Task";
import TasksView from "@/components/tasks/TasksView";

export default async function TasksPage({ searchParams }) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return <div>Unauthorized</div>; // or redirect later
	}

	const params = await searchParams;

	const search = params.search ?? "";
	const status = params.status ?? "";
	const sort = params.sort ?? "";

	await connectDB();

	const filter = {
		userId: new mongoose.Types.ObjectId(session.user.id),
	};

	if (status && status !== "all") {
		filter.status = status;
	}

	if (search) {
		filter.title = { $regex: search, $options: "i" };
	}

	let tasks = await Task.find(filter);

	if (sort === "priority") {
		const priorityOrder = { high: 1, medium: 2, low: 3 };
		tasks = tasks.sort(
			(a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
		);
	} else {
		tasks = tasks.sort((a, b) => b.createdAt - a.createdAt);
	}

	const tasksData = JSON.parse(JSON.stringify(tasks));

	return (
		<div className="pb-8 pt-4">
			<TasksView tasks={tasksData} />
		</div>
	);
}
