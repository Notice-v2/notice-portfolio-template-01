'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
	title: string
	description: string
	coverImage: string
	publishedAt: string
	id: string
	color?: string
}

export const ImageCard = ({ id, title, description, coverImage, publishedAt, color }: Props) => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	return (
		<Link href={id}>
			<div className={`relative h-full ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
				<img
					className="h-full w-full object-cover rounded-lg"
					src={
						!coverImage || coverImage === '-'
							? 'https://assets-notice.b-cdn.net/renderer/image-not-found-in-blog.svg'
							: coverImage
					}
					alt=""
				/>
				<div className="absolute inset-0 p-6 md:p-4 lg:p-8 bg-black/40 backdrop-blur-sm opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-start justify-start">
					<div className="text-white text-start">
						<h3 className="mb-2 text-sm md:text-md lg:text-2xl font-bold" style={{ color }}>
							{title}
						</h3>
						<p className="text-sm md:text-sm lg:text-lg line-clamp-3 lg:line-clamp-4 md:line-clamp-2">{description}</p>
						<p className="text-sm md:text-sm lg:text-lg mt-2">{dayjs(publishedAt).format('DD/MM/YYYY')}</p>
					</div>
				</div>
			</div>
		</Link>
	)
}
