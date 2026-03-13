"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Pencil } from "lucide-react";
import DeleteTaskButton from "./DeleteTaskButton";
import StatusSelect from "./StatusSelect";
import { priorityStyles } from "@/lib/taskStyles";
import Link from "next/link";

function formatDate(date) {
	return new Date(date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
}

export default function TaskCardList({ task }) {
	return (
		<Card className=" hover:shadow-md transition">
			<CardContent className="p-4 space-y-3">
				<div className="flex justify-between items-start">
					<div className="flex gap-4 items-center">
						<Badge className={`${priorityStyles[task.priority]} p-3`}>
							{task.priority}
						</Badge>

						<StatusSelect task={task} />
					</div>
				</div>

				<h3 className="font-semibold text-base">{task.title}</h3>

				{task.description && (
					<p className="text-sm text-muted-foreground leading-relaxed">
						{task.description}
					</p>
				)}

				<div className="flex flex-col text-xs text-muted-foreground gap-1">
					{task.dueDate && (
						<div className="flex items-center gap-1 text-xs text-orange-600">
							<Calendar className="w-3 h-3" />
							Due {formatDate(task.dueDate)}
						</div>
					)}

					<div className="flex items-center gap-1">
						<Clock className="w-3 h-3" />
						Created {formatDate(task.createdAt)}
						<span>•</span>
						Updated {formatDate(task.updatedAt)}
					</div>
				</div>

				<div className="flex justify-end gap-2 pt-2">
					<Button size="icon" variant="ghost">
						<Link href={`/tasks/${task._id}`} className="">
							<Pencil className="w-4 h-4" />
						</Link>
					</Button>

					<DeleteTaskButton id={task._id} />
				</div>
			</CardContent>
		</Card>
	);
}
