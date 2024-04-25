import { renderBlock } from './RenderBlocks'

interface Props {
	block: any
}

export function ListItemBlock({ block }: Props) {
	return (
		<li key={block.content[0]} className="ml-4">
			{block.content?.map((child: any) => renderBlock(child))}
		</li>
	)
}
