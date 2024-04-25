import { Hero } from '@/components/Hero'
import { ImageCard } from '@/components/ImageCard'
import { Navbar } from '@/components/Navbar'
import { NotFound } from '@/components/NotFound'
import { API, extractProjectID } from '@/tools/api'
import { Metadata } from 'next'
import { headers } from 'next/headers'

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

export async function generateMetadata({ searchParams }: { searchParams?: Record<string, any> }): Promise<Metadata> {
	// read route params
	const id = extractProjectID(headers(), searchParams)

	// fetch data
	const { data } = await API.get(`/projects/${id}`)

	const metadata: any = {
		title: '',
		openGraph: {} as Record<string, string>,
		twitter: {} as Record<string, string>,
	}

	data.metadata?.forEach((element: any) => {
		if (element.tagName === 'title') {
			metadata.title = element.innerText
		} else if (element.tagName === 'meta') {
			const attributes = element.attributes
			if (attributes.name) {
				if (attributes.name.startsWith('og:')) {
					metadata.openGraph[attributes.name.slice(3)] = attributes.content
				} else if (attributes.name.startsWith('twitter:')) {
					metadata.twitter[attributes.name.slice(8)] = attributes.content
				} else {
					metadata[attributes.name] = attributes.content
				}
			} else if (attributes.property) {
				if (attributes.property.startsWith('og:')) {
					metadata.openGraph[attributes.property.slice(3)] = attributes.content
				}
			}
		} else if (element.tagName === 'link') {
			const attributes = element.attributes
			if (attributes.rel === 'icon') {
				metadata.icon = attributes.href
			}
		}
	})

	return metadata
}

export default async function Home({ searchParams }: { searchParams?: Record<string, any> }) {
	const data = await getData(searchParams)
	console.log(data, 'data')

	const marginTop = data?.project.subtitle ? 'mt-72 md:mt-76 lg:mt-96' : 'mt-4'

	if (!data) return <NotFound />

	return (
		<>
			<Navbar meta={data?.metadata ?? []} color={data?.project?.accentColor} />
			{data.project.subtitle && <Hero subtitle={data.project.subtitle} />}
			<div className={`relative z-10 py-12 px-4 md:px-8 lg:px-12 ${marginTop}`}>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch bg-black">
					{data?.pages.map((page: any) => (
						<ImageCard
							key={page._id}
							id={page?._id}
							title={page?.title}
							description={page?.description}
							coverImage={page?.coverImage}
							publishedAt={page?.createdAt}
							color={data?.project?.accentColor}
						/>
					))}
				</div>
			</div>
		</>
	)
}
