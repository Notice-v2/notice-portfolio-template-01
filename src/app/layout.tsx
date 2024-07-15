import CreatedWithNotice from '@/components/CreatedWithNotice'
import { CustomCodeInjector } from '@/components/CustomCodeInjector'
import { API, extractProjectID } from '@/tools/api'
import { headers } from 'next/headers'
import Script from 'next/script'
import './globals.css'

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const projectData = await getProjectData()
	const { hideCreatedWithNotice, headCode } = projectData?.project || {}

	return (
		<html lang="en">
			<head>
				<Script id="custom-code-script" strategy="afterInteractive">
					{`window.__CUSTOM_CODE__ = ${JSON.stringify(headCode)};`}
				</Script>
			</head>

			<body className="h-full">
				<main className="mx-auto px-2 pb-16 h-full w-full">{children}</main>
				<CreatedWithNotice shouldHide={hideCreatedWithNotice} />
				<CustomCodeInjector />
			</body>
		</html>
	)
}

async function getProjectData() {
	const projectId = extractProjectID(headers(), { target: null })

	if (!projectId) return null

	try {
		const { data } = await API.get(`/projects/${projectId}`)
		return data
	} catch (_) {
		return null
	}
}
