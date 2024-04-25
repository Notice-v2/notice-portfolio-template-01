export interface MetadataElement {
	tagName: string
	innerText?: string
	attributes?: {
		[key: string]: string
	}
}

type MetadataMappingKey = string | [string, 'property' | 'name', string]

export const metadataMappings: Record<string, MetadataMappingKey> = {
	title: 'title',
	description: ['meta', 'name', 'description'],
	ogTitle: ['meta', 'property', 'og:title'],
	ogDescription: ['meta', 'property', 'og:description'],
	ogImage: ['meta', 'property', 'og:image'],
	twitterTitle: ['meta', 'name', 'twitter:title'],
	twitterDescription: ['meta', 'name', 'twitter:description'],
	twitterImage: ['meta', 'name', 'twitter:image'],
}

export interface Metadata {
	title: string
	description: string
	openGraph: {
		title?: string
		description?: string
		images: { url: string }[]
	}
	twitter: {
		title?: string
		description?: string
		images: { url: string }[]
	}
}
