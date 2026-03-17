import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import { Task } from "@/models/Task";

export async function POST(req) {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return Response.json(
				{ success: false, message: "Unauthorized" },
				{ status: 401 },
			);
		}

		// 1️⃣ Connect to database
		await connectDB();

		// 2️⃣ Parse request body
		const body = await req.json();

		const { title, description, status, priority, dueDate } = body;

		// 3️⃣ Basic validation
		if (!title) {
			return Response.json({ error: "Title is required" }, { status: 400 });
		}

		// 4️⃣ Create task
		const newTask = await Task.create({
			userId: new mongoose.Types.ObjectId(session.user.id),
			title,
			description,
			status,
			priority,
			dueDate,
		});

		// 5️⃣ Return success response
		return Response.json({ data: newTask }, { status: 201 });
	} catch (error) {
		console.error("POST /api/tasks error:", error);

		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function GET(req) {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return Response.json(
				{ success: false, message: "Unauthorized" },
				{ status: 401 },
			);
		}

		await connectDB();

		const { searchParams } = new URL(req.url);

		const status = searchParams.get("status");
		const sort = searchParams.get("sort");
		const search = searchParams.get("search");

		const filter = { userId: new mongoose.Types.ObjectId(session.user.id) };

		if (status && status !== "all") {
			filter.status = status;
		}

		if (search) {
			filter.title = { $regex: search, $options: "i" };
		}

		let tasks = await Task.find(filter);

		if (sort !== "priority") {
			tasks = tasks.sort((a, b) => b.createdAt - a.createdAt);
		}

		if (sort === "priority") {
			const priorityOrder = { high: 1, medium: 2, low: 3 };

			tasks = tasks.sort(
				(a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
			);
		}

		return Response.json({ data: tasks }, { status: 200 });
	} catch (error) {
		console.error("GET /api/tasks error:", error);

		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
