interface Props {
	block: any
}

export function ImageBlock({ block }: Props) {
	const { src } = block.attrs

	// 7/4 is the aspect of AI generated images (DALL-E 3)
	return (
		<div className="flex w-full py-2 justify-center">
			<img className="max-w-full" src={src} style={{ aspectRatio: 7 / 4 }} />
		</div>
	)
}
