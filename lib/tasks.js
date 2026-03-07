import { connectDB } from "./mongoose";
import { Task } from "@/models/Task";

export async function getTasks() {
	await connectDB();
	const tasks = await Task.find().lean();

	return tasks.map((task) => ({ ...task, _id: task._id.toString() }));
}

export async function getTaskById(id) {
	await connectDB();
	const task = await Task.findById(id).lean();
	return { ...task, _id: task._id.toString() };
}

export async function getTaskStats() {
	await connectDB();

	const stats = await Task.aggregate([
		{
			$group: {
				_id: null,
				total: { $sum: 1 },

				completed: {
					$sum: {
						$cond: [{ $eq: ["$status", "done"] }, 1, 0],
					},
				},

				pending: {
					$sum: {
						$cond: [{ $ne: ["$status", "done"] }, 1, 0],
					},
				},

				overdue: {
					$sum: {
						$cond: [
							{
								$and: [
									{ $lt: ["$dueDate", new Date()] },
									{ $ne: ["$status", "done"] },
								],
							},
							1,
							0,
						],
					},
				},
			},
		},
	]);

	return stats[0] || { total: 0, completed: 0, pending: 0, overdue: 0 };
}
