import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			enum: ["todo", "in-progress", "done"],
			default: "todo",
		},
		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			default: "medium",
		},
		dueDate: {
			type: Date,
		},
		completedAt: {
			type: Date,
		},

		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

export const Task = models.Task || model("Task", TaskSchema);
