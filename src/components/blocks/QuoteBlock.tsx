import { renderBlock } from './RenderBlocks'

interface Props {
	block: any
}

export const QuoteBlock = ({ block }: Props) => {
	return (
		<blockquote className="w-full my-8 px-4 py-2 border-l-4 border-l-gray-400" style={{ borderLeftColor: '#444756' }}>
			{block.content?.map((child: any) => renderBlock(child))}
		</blockquote>
	)
}
