import { Navbar } from '@/components/Navbar'
import { NotFound } from '@/components/NotFound'
import { PageContent } from '@/components/PageContent'
import { API } from '@/tools/api'
import { Metadata } from 'next'

async function getData(slug: string) {
	try {
		const { data } = await API.get(`/pages/${slug}`)
		return data
	} catch (ex) {
		return null
	}
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const id = params.slug

	// fetch data
	const { data } = await API.get(`/pages/${id}`)

	const metadata: any = {
		title: '',
		openGraph: {} as Record<string, string>,
		twitter: {} as Record<string, string>,
	}

	data.metadata?.elements.forEach((element: any) => {
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

export default async function Subpage({ params }: { params: { slug: string } }) {
	const data = await getData(params.slug)
	console.log(data.content)

	if (!data) return <NotFound />

	const homeHref = process.env.NODE_ENV === 'production' ? '/' : `/?target=${data.projectId}`

	return (
		<>
			<Navbar meta={data?.metadata?.elements ?? []} />

			<div className="mt-40 w-full px-4 md:px-12 text-white prose prose-slate">
				<h1 className="text-4xl mb-8 text-center font-bold">{data.title}</h1>
				<PageContent content={data.content} />
			</div>
		</>
	)
}
