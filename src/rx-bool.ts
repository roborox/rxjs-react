import React from "react"
import { Observable } from "rxjs"
import {useRx} from "./index"

interface Props {
	value: Observable<boolean>,
	not?: () => React.ReactElement,
	negate?: boolean
	children: React.ReactElement
}

export function RxBool({ value, children, negate, not }: Props): React.ReactElement | null {
	const bool = useRx(value)
	if (bool !== null) {
		if (negate && !bool) {
			return children
		} else if (negate) {
			return (not && not()) || null
		} else if (bool) {
			return children
		} else {
			return (not && not()) || null
		}
	}
	return null
}
