import { connectDB } from "@/lib/mongoose";
import { Task } from "@/models/Task";
import mongoose from "mongoose";

export async function GET(req, { params }) {
	try {
		const { id } = await params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return Response.json(
				{ error: "Invalid task ID format" },
				{ status: 400 },
			);
		}
		await connectDB();

		const task = await Task.findById(id);

		if (!task) {
			return Response.json(
				{ error: `Task with id: ${id} has not been found!` },
				{ status: 404 },
			);
		}

		return Response.json({ data: task }, { status: 200 });
	} catch (error) {
		console.log("GET /api/tasks/id error:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function PATCH(req, { params }) {
	try {
		const { id } = await params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return Response.json(
				{ error: "Invalid task ID format" },
				{ status: 400 },
			);
		}
		await connectDB();

		const body = await req.json();
		const update = {
			title: body.title,
			description: body.description,
			status: body.status,
			priority: body.priority,
			dueDate: body.dueDate,
		};

		if (body.status === "done") {
			update.completedAt = new Date();
		}

		if (body.status && body.status !== "done") {
			update.completedAt = null;
		}

		const updatedTask = await Task.findByIdAndUpdate(id, update, {
			returnDocument: "after",
			runValidators: true,
		});

		if (!updatedTask) {
			return Response.json(
				{ error: `Task with id: ${id} has not been found!` },
				{ status: 404 },
			);
		}

		return Response.json({ data: updatedTask }, { status: 200 });
	} catch (error) {
		console.log("PATCH /api/tasks/id error:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function DELETE(req, { params }) {
	try {
		const { id } = await params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return Response.json(
				{ error: "Invalid task ID format" },
				{ status: 400 },
			);
		}

		await connectDB();

		const deletedTask = await Task.findByIdAndDelete(id);

		if (!deletedTask) {
			return Response.json(
				{ error: `Task with id: ${id} not found` },
				{ status: 404 },
			);
		}

		return Response.json(
			{ message: "Task deleted successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.log("DELETE /api/tasks/id error:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
