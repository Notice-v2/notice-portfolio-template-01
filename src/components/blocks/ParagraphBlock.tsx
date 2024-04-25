import { Leaves } from './Leaves'

interface Props {
	block: any
}

export function ParagraphBlock({ block }: Props) {
	const textAlign = block?.attrs?.textAlign || 'left'

	if (block?.content?.length === 1 && block.content[0].text === '')
		return (
			<p className="w-full py-2">
				<br />
			</p>
		)

	return (
		<p className="w-full py-2" style={{ textAlign }}>
			<Leaves leaves={block.content} />
		</p>
	)
}
