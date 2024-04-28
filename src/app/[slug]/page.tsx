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
	const { data } = await API.get(`/pages/${id}`)

	const metadata = {
		title: '',
		description: '',
		icon: '',
		ogTitle: '',
		ogDescription: '',
		ogImage: '',
		twitterTitle: '',
		twitterDescription: '',
		twitterImage: '',
	}

	for (const item of data.metadata?.elements) {
		const { tagName, innerText, attributes } = item

		if (tagName === 'title') {
			metadata.title = innerText
			metadata.ogTitle = innerText
			metadata.twitterTitle = innerText
		} else if (tagName === 'link') {
			const { rel, href } = attributes
			metadata.icon = href
		} else if (tagName === 'meta') {
			const { name, property, content, rel, href } = attributes

			if (name === 'description') {
				metadata.description = content
				metadata.ogDescription = content
				metadata.twitterDescription = content
			} else if (property === 'og:image') {
				metadata.ogImage = content
			} else if (name === 'twitter:image') {
				metadata.twitterImage = content
			}
		}
	}

	return {
		title: metadata.title || 'Template Created with Notice',
		description: metadata.description || 'Notice is an no code editor to craft your content.',
		icons: {
			icon: metadata.icon,
			shortcut: metadata.icon,
			apple: metadata.icon,
			other: {
				rel: 'apple-touch-icon',
				url: metadata.icon,
			},
		},
		openGraph: {
			title: metadata.ogTitle,
			description: metadata.ogDescription,
			images: metadata.ogImage ? [{ url: metadata.ogImage }] : [],
		},
		twitter: {
			title: metadata.twitterTitle,
			description: metadata.twitterDescription,
			images: metadata.twitterImage ? [{ url: metadata.twitterImage }] : [],
		},
	}
}

export default async function Subpage({ params }: { params: { slug: string } }) {
	const data = await getData(params.slug)

	if (!data) return <NotFound />

	return (
		<>
			<Navbar meta={data?.metadata?.elements ?? []} />

			<div className="mt-32 md:mt-36 lg:mt-40 w-full px-4 md:px-12 text-white prose prose-slate">
				<h1 className="text-4xl mb-8 text-center font-bold">{data.title}</h1>
				<PageContent content={data.content} />
			</div>
		</>
	)
}
