import React from "react"
import { Observable } from "rxjs"
import { useRx } from "./use-rx"

export interface BaseRxProps<T> {
	value: Observable<T>
}

export interface ChildrenOptionalRxProps<T> extends BaseRxProps<T> {
	children?: (t: T) => React.ReactNode
}

export interface ChildrenRequiredRxProps<T> extends BaseRxProps<T> {
	children: (t: T) => React.ReactNode
}

export type RxProps<T> = T extends string | number | React.ReactElement
	? ChildrenOptionalRxProps<T>
	: ChildrenRequiredRxProps<T>

export function Rx<T>({ value, children }: RxProps<T>): React.ReactElement | null {
	const simple = useRx(value)
	if (simple !== null && children !== undefined) {
		return <>{children(simple)}</>
	} else if (simple !== null) {
		return <>{simple}</>
	}
	return null
}
