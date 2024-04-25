import { ReactNode } from 'react'

interface Props {
	block: any
	children?: ReactNode
}

export function BulletedListBlock({ children }: Props) {
	return <ul className="w-full py-2 space-y-1 list-disc">{children}</ul>
}
