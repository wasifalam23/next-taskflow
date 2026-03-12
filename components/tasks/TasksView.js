"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

	const router = useRouter();
	const searchParams = useSearchParams();

	const currentSearch = searchParams.get("search") || "";
	const [search, setSearch] = useState(currentSearch);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (search === currentSearch) return;

			const params = new URLSearchParams(searchParams.toString());

			if (search) {
				params.set("search", search);
			} else {
				params.delete("search");
			}

			router.push(`/tasks?${params.toString()}`);
		}, 400);

		return () => clearTimeout(timer);
	}, [search, currentSearch, searchParams, router]);

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
					<Input
						placeholder="Search tasks..."
						className="w-65"
						defaultValue={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

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
