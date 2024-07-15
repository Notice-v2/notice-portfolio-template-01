import { BulletedListBlock } from './BulletedListBlock'
import { CodeBlock } from './CodeBlock'
import { DividerBlock } from './DividerBlock'
import { HeaderBlock } from './HeaderBlock'
import { HintBlock } from './HintBlock'
import { HTMLBlock } from './HTML.block'
import { ImageBlock } from './ImageBlock'
import { ListItemBlock } from './ListItemBlock'
import { NumberedListBlock } from './NumberListBlock'
import { ParagraphBlock } from './ParagraphBlock'
import { QuoteBlock } from './QuoteBlock'

export function renderBlock(block: any) {
	switch (block.type) {
		case 'paragraph':
			return <ParagraphBlock key={block.id} block={block} />
		case 'heading':
			return <HeaderBlock key={block.id} block={block} />
		case 'blockquote':
			return <QuoteBlock key={block.id} block={block} />
		case 'hint':
			return <HintBlock key={block.id} block={block} />
		case 'codeBlock':
			return <CodeBlock key={block.id} block={block} />
		case 'horizontalRule':
			return <DividerBlock key={block.id} block={block} />
		case 'listItem':
			return <ListItemBlock key={block.id} block={block} />
		case 'bulletList':
			return (
				<BulletedListBlock key={block.id} block={block}>
					{block.content?.map((child: any) => renderBlock(child))}
				</BulletedListBlock>
			)
		case 'orderedList':
			return (
				<NumberedListBlock key={block.id} block={block}>
					{block.content?.map((child: any) => renderBlock(child))}
				</NumberedListBlock>
			)
		case 'image':
			return <ImageBlock key={block.id} block={block} />
		case 'html':
			return <HTMLBlock key={block.id} block={block} />
		default:
			return <></>

		// missing
		// video, audio, document (and javascript but we will not implment it)
	}
}
