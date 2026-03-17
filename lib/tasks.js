import { connectDB } from "./mongoose";
import { Task } from "@/models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";

export async function getTasks(limit) {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Unauthorized");

	await connectDB();

	let query = Task.find({
		userId: new mongoose.Types.ObjectId(session.user.id),
	}).sort({ createdAt: -1 });

	if (limit) {
		query = query.limit(limit);
	}

	const tasks = await query.lean();

	return tasks.map((task) => ({
		...task,
		_id: task._id.toString(),
	}));
}

export async function getTaskById(id) {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Unauthorized");

	await connectDB();
	const task = await Task.findOne({
		_id: new mongoose.Types.ObjectId(id),
		userId: new mongoose.Types.ObjectId(session.user.id),
	}).lean();

	if (!task) return null;

	return { ...task, _id: task._id.toString() };
}

export async function getTaskStats() {
	const session = await getServerSession(authOptions);

	if (!session) throw new Error("Unauthorized");

	await connectDB();

	const stats = await Task.aggregate([
		{ $match: { userId: new mongoose.Types.ObjectId(session.user.id) } },
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
