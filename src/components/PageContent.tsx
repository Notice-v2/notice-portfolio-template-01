'use client'

import { renderBlock } from '@/components/blocks/RenderBlocks'
import { useMemo } from 'react'

interface Props {
	content: any[]
}

export function PageContent({ content }: Props) {
	function removeFirstElement(arr: any[]) {
		const newArr = arr.slice()
		newArr.shift()
		return newArr
	}

	const filteredContent = useMemo(() => removeFirstElement(content ?? []), [content])

	return filteredContent.map((block) => renderBlock(block))
}
