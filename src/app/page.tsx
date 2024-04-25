import { Hero } from '@/components/Hero'
import { ImageCard } from '@/components/ImageCard'
import { Navbar } from '@/components/Navbar'
import { NotFound } from '@/components/NotFound'
import { API, extractProjectID } from '@/tools/api'
import { MetadataElement, metadataMappings } from '@/tools/metadata'
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

	const metadataElements: MetadataElement[] = data.metadata || []

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
		title: metadata.title || 'Template Created with Notice',
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

export default async function Home({ searchParams }: { searchParams?: Record<string, any> }) {
	const data = await getData(searchParams)

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
