"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import KanbanBoardClient from "@/components/tasks/kanban/KanbanBoardClient";
import TaskCard from "@/components/tasks/list/TaskCard";
import { Button } from "@/components/ui/button";

export default function TasksView({ tasks }) {
	const [kanbanMode, setKanbanMode] = useState(false);
	const [isSearching, setIsSearching] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	const currentSearch = searchParams.get("search") || "";
	const hasSearch = searchParams.get("search");

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

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsSearching(false);
	}, [tasks]);

	const updateParam = (key, value) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value && value !== "all") {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		router.push(`/tasks?${params.toString()}`);
	};

	const isEmpty = tasks.length === 0;

	return (
		<>
			<div className="flex items-center justify-between py-8">
				<h1 className="text-3xl font-medium">Tasks</h1>

				<Button size="lg" asChild>
					<Link href="/tasks/new">
						<Plus className="h-4 w-4" />
						<span className="sm:hidden">New task</span>
						<span className="hidden sm:inline">Create new task</span>
					</Link>
				</Button>
			</div>

			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
				<div className="flex items-center gap-3 flex-wrap">
					<Input
						placeholder="Search tasks..."
						className="w-65"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							setIsSearching(true);
						}}
					/>

					<Select
						disabled={kanbanMode}
						defaultValue={searchParams.get("status") || "all"}
						onValueChange={(value) => updateParam("status", value)}>
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

					<Select
						defaultValue={searchParams.get("sort") || ""}
						onValueChange={(value) => updateParam("sort", value)}>
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
					<Switch
						className="cursor-pointer"
						checked={kanbanMode}
						onCheckedChange={setKanbanMode}
					/>
					<Label>Kanban</Label>
				</div>
			</div>

			<div
				className={`transition-opacity duration-200 ${
					isSearching ? "opacity-30" : "opacity-100"
				}`}>
				{isEmpty ? (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<SearchX className="w-10 h-10 text-muted-foreground mb-4" />

						<p className="text-lg font-medium">
							{hasSearch ? "No tasks found" : "No tasks yet"}
						</p>

						<p className="text-sm text-muted-foreground">
							{hasSearch
								? "Try adjusting your search or filters."
								: "Create your first task to get started."}
						</p>
					</div>
				) : kanbanMode ? (
					<KanbanBoardClient tasks={tasks} />
				) : (
					<div className="space-y-4">
						{tasks.map((task) => (
							<TaskCard key={task._id} task={task} />
						))}
					</div>
				)}
			</div>
		</>
	);
}
