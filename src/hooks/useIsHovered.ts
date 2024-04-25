'use client'

import { useLayoutEffect, useState } from 'react'

/**
 * Tells if components are hovered or not, pass it an array of refs and it returns an array of booleans.
 *
 * @example
 * 	const isHovered = useIsHovered([parentRef, childRef]).some(Boolean)

 *
 * TODO: combine this hook with a version that takes a single ref. Use function overloading.
 */
export const useIsHovered = (refs: Array<React.RefObject<HTMLElement> | null>): boolean[] => {
	// we assume the mouse is not inside when the component mounts (it might be false)

	// TODO: useMap to simplify state updates
	const [isHoveredByRefs, setIsHoveredByRefs] = useState(new Map<HTMLElement, boolean>())

	useLayoutEffect(() => {
		const mouseEnterListeners = new Map(
			refs.map((ref) => [
				ref,
				() => {
					if (!ref || !ref.current) return
					setIsHoveredByRefs(new Map<HTMLElement, boolean>(isHoveredByRefs.set(ref.current, true)))
				},
			])
		)
		const mouseLeaveListeners = new Map(
			refs.map((ref) => [
				ref,
				() => {
					if (!ref || !ref.current) return
					setIsHoveredByRefs(new Map<HTMLElement, boolean>(isHoveredByRefs.set(ref!.current, false)))
				},
			])
		)

		for (const i in refs) {
			const ref = refs[i]
			if (!ref || !ref.current) {
				continue
			}
			ref.current.addEventListener('mouseenter', mouseEnterListeners.get(ref)!)
			ref.current.addEventListener('mouseleave', mouseLeaveListeners.get(ref)!)

			const isHovered = ref.current.matches(':hover')
			if (isHovered !== isHoveredByRefs.get(ref!.current)) {
				setIsHoveredByRefs(new Map<HTMLElement, boolean>(isHoveredByRefs.set(ref.current, isHovered)))
			}
		}
		return () => {
			for (const i in refs) {
				const ref = refs[i]
				if (!ref || !ref.current) {
					continue
				}
				ref.current.removeEventListener('mouseenter', mouseEnterListeners.get(ref)!)
				ref.current.removeEventListener('mouseleave', mouseLeaveListeners.get(ref)!)
			}
		}
	}, [...refs])

	return refs.map((ref) => (ref?.current ? isHoveredByRefs.get(ref.current) || false : false))
}
