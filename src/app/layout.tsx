import CreatedWithNotice from '../components/CreatedWithNotice'
import './globals.css'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="h-full">
				<main className="mx-auto px-2 pb-16 h-full w-full">{children}</main>
				<CreatedWithNotice />
			</body>
		</html>
	)
}
