import { NotFound } from '@/components/NotFound'
import { API, extractProjectID } from '@/tools/api'
import { headers } from 'next/headers'
import Link from 'next/link'

async function getData(searchParams?: Record<string, any>) {
	const projectId = extractProjectID(headers(), searchParams)
	if (!projectId) return null

	try {
		const { data } = await API.get(`/projects/${projectId}`)
		return data
	} catch (_) {
		return null
	}
}

export default async function Home({ searchParams }: { searchParams?: Record<string, any> }) {
	const data = await getData(searchParams)

	if (!data) return <NotFound />

	return (
		<>
			<header className="py-16 sm:text-center">
				<h1 className="mb-4 text-3xl sm:text-4xl tracking-tight text-slate-900 font-extrabold">{data.project.name}</h1>
				{data.project.description ? <p className="text-lg text-slate-700">{data.project.description}</p> : <></>}
			</header>
			<div className="space-y-16 lg:px-32 md:px-24">
				{data.pages.map((page: any) => (
					<article key={page._id} className="relative group">
						<Link href={`/${page.slug ?? page._id}`}>
							<div className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-slate-100"></div>
							<div className="relative">
								<h3 className="text-base font-semibold tracking-tight text-slate-900">{page.title}</h3>
								<div className="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 line-clamp-2">
									<p>{page.description}</p>
								</div>
							</div>
							<div className="flex items-center text-sm text-sky-500 font-medium">
								<span className="relative">Read more</span>
								<svg
									className="relative mt-px overflow-visible ml-2.5 text-sky-300"
									width="3"
									height="6"
									viewBox="0 0 3 6"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M0 0L3 3L0 6"></path>
								</svg>
							</div>
						</Link>
					</article>
				))}
			</div>
		</>
	)
}
