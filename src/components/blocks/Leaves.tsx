import { ReactNode } from 'react'

interface Props {
	leaves: any[]
}

const leafComponents = {
	bold: (node: ReactNode) => <strong>{node}</strong>,
	code: (node: ReactNode) => (
		<code className="rounded-md text-sm p-1 font-semibold text-red-600 bg-red-100">{node}</code>
	),
	italic: (node: ReactNode) => <em>{node}</em>,
	strike: (node: ReactNode) => <s>{node}</s>,
	underline: (node: ReactNode) => <u>{node}</u>,
	link: (node: ReactNode, attrs: any) => (
		<a className="text-sky-500 hover:text-decoration-line: none;" href={attrs?.href} target="_blank">
			{node}
		</a>
	),
} as any

export function Leaves({ leaves }: Props) {
	return leaves?.map((item) => {
		let node = item.text
		if (item.marks && item.marks.length > 0) {
			item.marks.forEach((mark: Record<string, string>) => {
				if (leafComponents[mark.type]) {
					node = leafComponents[mark.type](node, mark?.attrs)
				}
			})
		}
		return node
	})
}
