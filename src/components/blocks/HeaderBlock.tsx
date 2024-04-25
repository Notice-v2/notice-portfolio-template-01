import { Leaves } from './Leaves'

interface Props {
	block: any
}

const tags: Record<number, keyof JSX.IntrinsicElements> = {
	1: 'h1',
	2: 'h2',
	3: 'h3',
	4: 'h4',
	5: 'h5',
	6: 'h6',
}

const styles: any = {
	'1': 'text-4xl', // Assuming these are Tailwind CSS classes
	'2': 'text-3xl',
	'3': 'text-2xl',
}

export function HeaderBlock({ block }: Props) {
	const Tag = tags[block.attrs.level as keyof typeof tags]
	const textAlign = block?.attrs?.textAlign || 'left'

	return (
		<Tag className={`${styles[block.attrs.level]} leading-9`} style={{ textAlign }}>
			<Leaves leaves={block.content} />
		</Tag>
	)
}
