import React from "react"
import { Observable } from "rxjs"
import { useRx } from "./use-rx"

type Observed<T> = {
	[K in keyof T]: Observable<T[K]>;
}

export type LiftedProps<Props extends Record<string, any>, K extends keyof Props> =
	& Omit<Props, K>
	& Observed<Pick<Props, K>>

export function lift<Props extends Record<string, any>, K extends keyof Props>(
	Component: React.ComponentType<Props>, key: K,
) {
	const originalName = Component.displayName || Component.name || "Unknown"
	function LiftedComponent(props: Props) {
		const value = useRx(props[key] as Observable<Props[K]>)
		if (value !== null) {
			const resultProps = { ...props }
			resultProps[key] = value

			return <Component {...resultProps as Props} />
		} else {
			return null
		}
	}

	LiftedComponent.displayName = `lifted(${originalName})`
	return LiftedComponent as React.FC<LiftedProps<Props, K>>
}
