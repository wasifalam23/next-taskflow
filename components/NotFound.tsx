import Link from 'next/link';

type NotFoundProps = {
	title?: string;
	description?: string;
	showHomeButton?: boolean;
};

export default function NotFound({
	title = 'Page not found',
	description = 'Sorry, we couldn’t find what you’re looking for.',
	showHomeButton = true,
}: NotFoundProps) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
			<h1 className="text-6xl font-bold text-gray-800">404</h1>

			<h2 className="mt-4 text-xl font-semibold text-gray-700">{title}</h2>

			<p className="mt-2 text-sm text-gray-500 max-w-sm">{description}</p>

			{showHomeButton && (
				<Link
					href="/"
					className="mt-6 px-4 py-2 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-700 transition">
					Go back home
				</Link>
			)}
		</div>
	);
}
