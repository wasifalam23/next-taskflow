import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import { connectDB } from '@/lib/mongoose';
import { Task } from '@/models/Task';
import type { NextRequest } from 'next/server';
import type { TaskStatus, TaskPriority } from '@/types/task';

type RouteParams = {
	params: Promise<{
		id: string;
	}>;
};

export async function GET(_: NextRequest, { params }: RouteParams) {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return Response.json(
				{ success: false, message: 'Unauthorized' },
				{ status: 401 },
			);
		}

		const { id } = await params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return Response.json(
				{ error: 'Invalid task ID format' },
				{ status: 400 },
			);
		}

		await connectDB();

		const task = await Task.findOne({
			_id: new mongoose.Types.ObjectId(id),
			userId: new mongoose.Types.ObjectId(session.user.id),
		});

		if (!task) {
			return Response.json(
				{ error: `Task not found or unauthorized` },
				{ status: 404 },
			);
		}

		return Response.json({ data: task }, { status: 200 });
	} catch (error) {
		console.log('GET /api/tasks/id error:', error);
		return Response.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return Response.json(
				{ success: false, message: 'Unauthorized' },
				{ status: 401 },
			);
		}

		const { id } = await params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return Response.json(
				{ error: 'Invalid task ID format' },
				{ status: 400 },
			);
		}

		await connectDB();

		const body = await req.json();

		const update: {
			title?: string;
			description?: string | null;
			status?: TaskStatus;
			priority?: TaskPriority;
			dueDate?: Date | string | null;
			completedAt?: Date | null;
		} = {};

		if (body.title !== undefined) update.title = body.title;
		if (body.description !== undefined) update.description = body.description;
		if (body.status !== undefined) update.status = body.status;
		if (body.priority !== undefined) update.priority = body.priority;
		if (body.dueDate !== undefined) update.dueDate = body.dueDate;

		if (body.status === 'done') {
			update.completedAt = new Date();
		}

		if (body.status && body.status !== 'done') {
			update.completedAt = null;
		}

		const updatedTask = await Task.findOneAndUpdate(
			{
				_id: new mongoose.Types.ObjectId(id),
				userId: new mongoose.Types.ObjectId(session.user.id),
			},
			update,
			{
				new: true,
				runValidators: true,
			},
		);

		if (!updatedTask) {
			return Response.json(
				{ error: `Task not found or unauthorized` },
				{ status: 404 },
			);
		}

		return Response.json({ data: updatedTask }, { status: 200 });
	} catch (error) {
		console.log('PATCH /api/tasks/id error:', error);
		return Response.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function DELETE(_: NextRequest, { params }: RouteParams) {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return Response.json(
				{ success: false, message: 'Unauthorized' },
				{ status: 401 },
			);
		}
		const { id } = await params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return Response.json(
				{ error: 'Invalid task ID format' },
				{ status: 400 },
			);
		}

		await connectDB();

		const deletedTask = await Task.findOneAndDelete({
			_id: new mongoose.Types.ObjectId(id),
			userId: new mongoose.Types.ObjectId(session.user.id),
		});

		if (!deletedTask) {
			return Response.json(
				{ error: 'Task not found or unauthorized' },
				{ status: 404 },
			);
		}

		return Response.json(
			{ message: 'Task deleted successfully' },
			{ status: 200 },
		);
	} catch (error) {
		console.log('DELETE /api/tasks/id error:', error);
		return Response.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
