import { NotFound } from '@/components/NotFound'
import { API } from '@/tools/api'
import dayjs from 'dayjs'
import Link from 'next/link'

async function getData(slug: string) {
	try {
		const { data } = await API.get(`/pages/${slug}`)
		return data
	} catch (ex) {
		return null
	}
}

export default async function Subpage({ params }: { params: { slug: string } }) {
	const data = await getData(params.slug)

	if (!data) return <NotFound />

	const homeHref = process.env.NODE_ENV === 'production' ? '/' : `/?target=${data.projectId}`

	return (
		<div>
			<div className="absolute top-0 left-10">
				<div className="flex pt-8 pb-10">
					<Link
						className="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900"
						href={homeHref}
					>
						<svg
							viewBox="0 -9 3 24"
							className="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600"
						>
							<path
								d="M3 0L0 3L3 6"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
						Go back
					</Link>
				</div>
			</div>
			<article className="relative pt-10 mt-24">
				<h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl ">{data.title}</h1>
				<div className="text-sm leading-6">
					<dl>
						<dt className="sr-only">Date</dt>
						<dd className="absolute top-0 inset-x-0 text-slate-700">
							<time dateTime={data.datePublished}>Published on {dayjs(data.datePublished).format('MMM D, YYYY')}</time>
						</dd>
					</dl>
				</div>
				<div className="mt-6">
					<ul className="flex flex-wrap text-sm leading-6 -mt-6 -mx-5">
						<li className="flex items-center font-medium whitespace-nowrap px-5 mt-6">
							<img
								src={data.author.picture}
								alt=""
								className="mr-3 w-9 h-9 rounded-full bg-slate-50"
								decoding="async"
							/>
							<div className="text-sm leading-4">
								<div className="text-base text-slate-900">{data.author.name}</div>
							</div>
						</li>
					</ul>
				</div>
				<div className="mt-12 prose prose-slate"></div>
			</article>
		</div>
	)
}
