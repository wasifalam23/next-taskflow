'use client';

import dynamic from 'next/dynamic';
import type { Task } from '@/types/task';

const KanbanBoard = dynamic(() => import('./KanbanBoard'), {
	ssr: false,
});

type KanbanBoardClientProps = {
	tasks: Task[];
};

export default function KanbanBoardClient({ tasks }: KanbanBoardClientProps) {
	return <KanbanBoard tasks={tasks} />;
}
