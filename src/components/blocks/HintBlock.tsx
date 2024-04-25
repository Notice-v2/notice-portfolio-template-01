import { Leaves } from './Leaves'

interface Props {
	block: any
}

const ICONS: { [key: string]: string } = {
	info: '📘',
	warning: '⚠️',
	danger: '🚫',
	tip: '🌱',
}

const borderColors: { [key: string]: string } = {
	info: 'border-l-sky-500',
	warning: 'border-l-yellow-500',
	danger: 'border-l-red-500',
	tip: 'border-l-green-500',
}

export function HintBlock({ block }: Props) {
	const { attrs } = block
	const type = attrs?.category?.toLowerCase() ?? 'info'

	return (
		<div
			className={`flex gap-2 my-8 py-4 w-full items-baseline bg-gray-800 border-l-4 ${borderColors[type]} rounded-lg`}
		>
			<div className="flex-shrink-0 ml-4 mr-2">{ICONS[type]}</div>
			<div className="overflow-wrap-anywhere mr-3">
				<Leaves leaves={block.content} />
			</div>
		</div>
	)
}
