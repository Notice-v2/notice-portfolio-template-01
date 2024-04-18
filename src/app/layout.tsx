import './globals.css'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<main className="max-w-[52rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">{children}</main>
				<div className="z-[-1] absolute w-full h-full min-h-screen opacity-25 invert-[1] bg-[url('/textured-noise.png')] top-0"></div>
			</body>
		</html>
	)
}
