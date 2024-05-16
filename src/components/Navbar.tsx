'use client'
import Link from 'next/link'
import { useMemo } from 'react'

interface Props {
	meta: any
	color?: string
	projectId: string
}

export const Navbar = ({ meta, color, projectId }: Props) => {
	const title = useMemo(
		() =>
			meta?.find((m: any) => m.tagName === 'meta' && m.attributes?.property === 'og:site_name')?.attributes?.content,
		[meta]
	)
	const logo = useMemo(
		() => meta?.find((m: any) => m.tagName === 'link' && m.attributes?.rel === 'icon')?.attributes?.href,
		[meta]
	)

	const homeHref = process.env.NODE_ENV === 'production' ? '/' : `/?target=${projectId}`

	return (
		<nav
			className="fixed top-0 z-50 flex items-center justify-between py-2 px-4 md:px-10 lg:px-14"
			style={{ width: 'inherit' }}
		>
			<div className="flex items-center justify-between gap-4 h-20 md:h-28" style={{ width: 'calc(100% - 1em)' }}>
				<Link href={homeHref}>
					<img src={logo} alt="Logo" className="w-6 h-6 md:w-8 md:h-8" />
				</Link>
				<span className="text-sm md:text-lg text-neutral-400" style={{ color: color }}>
					{title}
				</span>
			</div>
		</nav>
	)
}
