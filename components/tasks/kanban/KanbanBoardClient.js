"use client";

import dynamic from "next/dynamic";

const KanbanBoard = dynamic(() => import("./KanbanBoard"), {
	ssr: false,
});

export default function KanbanBoardClient({ tasks }) {
	return <KanbanBoard tasks={tasks} />;
}
