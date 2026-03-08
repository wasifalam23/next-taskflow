"use client";

import { useRouter } from "next/navigation";

export default function DeleteTaskButton({ id }) {
	const router = useRouter();

	const deleteTaskHandler = async () => {
		try {
			const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });

			if (!res.ok) {
				throw new Error("Failed to delete task");
			}

			router.refresh();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<button
			onClick={deleteTaskHandler}
			className="px-3 py-1.5 rounded-md cursor-pointer bg-red-600 hover:bg-red-500 text-gray-50">
			Delete
		</button>
	);
}
