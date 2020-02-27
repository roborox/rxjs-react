import React from "react"
import { Observable } from "rxjs"
import {useRx} from "./index"

interface Props {
	value: Observable<boolean>
	children: React.ReactElement
}

export function RxBool({ value, children }: Props) {
	const bool = useRx(value)
	if (bool !== null && bool) {
		return children
	}
	return null
}
