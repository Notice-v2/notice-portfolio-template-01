import { NoticeLogo } from '@/logo/NoticeLogo'
import Link from 'next/link'

export default function CreatedWithNotice() {
	return (
		<div className="fixed bottom-2 right-2 bg-neutral-900 border border-gray-600 rounded-lg shadow-md p-2 flex items-center justify-center z-50">
			<div>
				<NoticeLogo size={16} />
			</div>
			<Link href="https://notice.studio" className="text-gray-300 font-medium text-xs ml-2" target="_blank">
				Created with Notice
			</Link>
		</div>
	)
}
