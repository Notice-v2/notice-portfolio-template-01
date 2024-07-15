interface Props {
	block: any
}

export const HTMLBlock = ({ block }: Props) => {
	const { content } = block

	if (!content || content[0] === undefined) {
		return null
	}

	const code = content[0]?.text
	return <div className="w-full h-fit" dangerouslySetInnerHTML={{ __html: code }}></div>
}
