import { ReactNode } from 'react'

interface Props {
	block: any
	children?: ReactNode
}

export function NumberedListBlock({ children }: Props) {
	return <ol className="w-full py-2 space-y-1 list-decimal">{children}</ol>
}
