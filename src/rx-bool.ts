import React from "react"
import { Observable } from "rxjs"
import {useRx} from "./index"

interface Props {
	value: Observable<boolean>,
	negate?: boolean
	children: React.ReactElement
}

export function RxBool({ value, children, negate }: Props) {
	const bool = useRx(value)
	if (bool !== null) {
		if (negate && !bool) {
			return children
		} else if (negate) {
			return null
		} else if (bool) {
			return children
		} else {
			return null
		}
	}
	return null
}
