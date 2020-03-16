import React from "react"
import { Observable } from "rxjs"
import { useRx } from "./index"

export interface RxIfProps {
	test: Observable<boolean>,
	else?: () => React.ReactNode,
	negate?: boolean
	children: React.ReactNode
}

export function RxIf({ test, children, negate, else: not }: RxIfProps): React.ReactElement | null {
	const bool = useRx(test)

	if (bool !== null) {
		if (negate && !bool) {
			return <>{children}</>
		} else if (negate) {
			return <>{not?.() || null}</>
		} else if (bool) {
			return <>{children}</>
		} else {
			return <>{not?.() || null}</>
		}
	}
	return null
}