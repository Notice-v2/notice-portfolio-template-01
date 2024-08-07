'use client'

import { useIsHovered } from '@/hooks/useIsHovered'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.min.css'
import { useEffect, useRef } from 'react'

interface Props {
	block: any
}

export function CodeBlock({ block }: Props) {
	const parentRef = useRef<HTMLDivElement>(null)
	const isHovered = useIsHovered([parentRef]).some(Boolean)

	const { content } = block
	const code = content[0]

	useEffect(() => {
		hljs.configure({
			languages: [
				'js',
				'ts',
				'jsx',
				'tsx',
				'css',
				'scss',
				'html',
				'shell',
				'java, "C++',
				'C#',
				'Python',
				'Ruby',
				'Go',
				'Rust',
				'PHP',
				'Bash',
				'PowerShell',
				'Sass',
				'SQL',
				'Visual Basic',
				'YAML',
			],
		})
		hljs.highlightAll()
	}, [])

	return (
		<div ref={parentRef} className="relative w-full my-2">
			<pre className="overflow-auto rounded-lg">
				<code className="block whitespace-pre">{code.text}</code>
			</pre>
			{isHovered && (
				<button className="absolute top-2 right-2 bg-gray-700 rounded-md p-1" aria-label="copy-button">
					copy
				</button>
			)}
		</div>
	)
}
