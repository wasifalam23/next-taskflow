import TasksView from "@/components/tasks/TasksView";

export default async function TasksPage({ searchParams }) {
	const params = await searchParams;

	const search = params.search ?? "";
	const status = params.status ?? "";
	const sort = params.sort ?? "";

	const query = new URLSearchParams({
		search,
		status,
		sort,
	});

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/tasks?${query}`,
	);

	const { data } = await res.json();

	return (
		<div className="pb-8 pt-4">
			<TasksView tasks={data} />
		</div>
	);
}
