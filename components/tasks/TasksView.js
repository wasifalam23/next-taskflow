"use client";

import Link from "next/link";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import KanbanBoardClient from "@/components/kanban/KanbanBoardClient";
import TaskCard from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";

export default function TasksView({ tasks }) {
	const [kanbanMode, setKanbanMode] = useState(false);

	return (
		<>
			<div className="flex items-center justify-between py-8">
				<h1 className="text-3xl font-medium">Tasks</h1>
				<Button size="lg" asChild>
					<Link href="/tasks/new">
						<Plus className="w-4 h-4 mr-2" />
						Create new task
					</Link>
				</Button>
			</div>

			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
				<div className="flex items-center gap-3">
					<Input placeholder="Search tasks..." className="w-65" />

					<Select>
						<SelectTrigger className="w-35">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="todo">Todo</SelectItem>
							<SelectItem value="in-progress">In Progress</SelectItem>
							<SelectItem value="done">Done</SelectItem>
						</SelectContent>
					</Select>

					<Select>
						<SelectTrigger className="w-35">
							<SelectValue placeholder="Sort" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="createdAt">Newest</SelectItem>
							<SelectItem value="priority">Priority</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex items-center gap-2">
					<Label>List</Label>
					<Switch checked={kanbanMode} onCheckedChange={setKanbanMode} />
					<Label>Kanban</Label>
				</div>
			</div>

			{kanbanMode ? (
				<KanbanBoardClient tasks={tasks} />
			) : (
				<div className="space-y-4">
					{tasks.map((task) => (
						<TaskCard key={task._id} task={task} />
					))}
				</div>
			)}
		</>
	);
}
