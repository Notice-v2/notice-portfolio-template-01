import { Navbar } from '@/components/Navbar'
import { NotFound } from '@/components/NotFound'
import { PageContent } from '@/components/PageContent'
import { API } from '@/tools/api'
import { MetadataElement, metadataMappings } from '@/tools/metadata'
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
	const metadataElements: MetadataElement[] = data.metadata?.elements || []

	const metadata = metadataElements.reduce(
		(acc, { tagName, innerText, attributes }) => {
			const { name, property, content } = attributes || {}
			const mappingKeys =
				metadataMappings[tagName] || (property && metadataMappings[property]) || (name && metadataMappings[name])

			if (mappingKeys) {
				if (typeof mappingKeys === 'string') {
					acc[mappingKeys] = innerText
				} else {
					const [requiredTagName, requiredProperty, requiredName] = mappingKeys
					if (
						tagName === requiredTagName &&
						((!requiredProperty && !requiredName) ||
							(requiredProperty && property === requiredProperty) ||
							(requiredName && name === requiredName))
					) {
						acc[requiredName || requiredProperty] = content
					}
				}
			}

			return acc
		},
		{} as Record<string, string | undefined>
	)

	return {
		title: metadata.title || 'Template Page Created with Notice',
		description: metadata.description || 'Notice is an no code editor to craft your content.',
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
