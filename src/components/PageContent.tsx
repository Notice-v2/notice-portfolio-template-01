type Content =
	| {
			type: string
			attrs?: Record<string, any>
			content: Content[]
	  }
	| {
			type: 'text'
			text: string
			marks?: ({ type: string } & Record<string, any>)[]
	  }

// TODO: Implement the PageContent component
export function PageContent({ content }: { content: Content[] }) {
	return content.map((item, idx) => <p key={idx}>{item.type}</p>)
}
