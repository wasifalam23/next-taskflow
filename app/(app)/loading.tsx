export default function Loading() {
	return (
		<div className="flex items-center justify-center min-h-[80vh] w-full px-4">
			<div className="w-full max-w-sm h-1 bg-gray-200 rounded overflow-hidden">
				<div className="h-full bg-gray-800 animate-[loading_1.5s_infinite]"></div>
			</div>

			<style>
				{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
			</style>
		</div>
	);
}
