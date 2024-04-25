'use client'

import { useEffect, useState } from 'react'

interface Props {
	subtitle: string
}

export const Hero = ({ subtitle }: Props) => {
	const [scrollPosition, setScrollPosition] = useState(0)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const opacity = 1 - scrollPosition / 200
	return (
		<header className={`fixed box-border top-40 w-full transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
			<div className="container box-border w-full lg:w-3/4 flex items-end lg:ml-auto py-3 px-4 md:px-10 lg:px-14">
				<h1 className="text-lg md:text-xl lg:text-3xl lg:pt-10 line-clamp-3 text-white box-border" style={{ opacity }}>
					{subtitle}
				</h1>
			</div>
		</header>
	)
}
