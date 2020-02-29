import React from "react"
import { ReactNode } from "react"
import { Observable } from "rxjs"
import { useRx } from "./index"

interface Props {
	test: Observable<boolean>,
	else?: () => ReactNode,
	negate?: boolean
	children: ReactNode
}

export function RxIf({ test, children, negate, else: not }: Props) {
	const bool = useRx(test)
	if (bool !== null) {
		if (negate && !bool) {
			return <>{children}</>
		} else if (negate) {
			return (not && <>{not()}</>) || null
		} else if (bool) {
			return <>{children}</>
		} else {
			return (not && <>{not()}</>) || null
		}
	}
	return null
}
