export function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen pb-32">
			<h1 className="text-9xl text-slate-900 font-extrabold">404</h1>
			<h3 className="mt-2 text-2xl text-slate-700 font-medium">Notice Not Found</h3>
			<p className="mt-4 text-lg text-slate-500 font-normal">The page requested could not be found on the server!</p>
		</div>
	)
}
