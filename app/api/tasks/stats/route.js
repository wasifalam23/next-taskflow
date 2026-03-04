import { connectDB } from "@/lib/mongoose";
import { Task } from "@/models/Task";

export async function GET(req) {
	try {
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

		return Response.json(
			{ data: stats[0] || { total: 0, completed: 0, pending: 0, overdue: 0 } },
			{ status: 200 },
		);
	} catch (error) {
		console.log("GET /api/tasks/stats error:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
