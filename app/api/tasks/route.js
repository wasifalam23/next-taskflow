import { connectDB } from "@/lib/mongoose";
import { Task } from "@/models/Task";

export async function POST(req) {
	try {
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
		await connectDB();

		const { searchParams } = new URL(req.url);

		const status = searchParams.get("status");
		const sort = searchParams.get("sort");

		const filter = {};

		if (status) {
			filter.status = status;
		}

		let sortOption = { createdAt: -1 };

		if (sort === "priority") {
			sortOption = { priority: 1 };
		}

		const tasks = await Task.find(filter).sort(sortOption);

		return Response.json({ data: tasks }, { status: 200 });
	} catch (error) {
		console.error("GET /api/tasks error:", error);

		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
