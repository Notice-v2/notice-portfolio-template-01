import './globals.css'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="h-full">
				<main className="mx-auto px-2 pb-28 h-full w-full">{children}</main>
			</body>
		</html>
	)
}
