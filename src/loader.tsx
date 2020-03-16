import React, { useMemo } from "react"
import { Observable } from "rxjs"
import { useRx } from "./use-rx"
import { LoadingStatus } from "./loading-state"
import { caseWhen } from "./case-when"

export interface LoaderProps {
	status: Observable<LoadingStatus>
	idle?: React.ReactNode
	loading?: React.ReactNode
	error?: (error: any) => React.ReactNode
	children: React.ReactNode
}

export function Loader({ status, children, idle, loading, error }: LoaderProps): React.ReactElement {
	const rx = useMemo(() => caseWhen(status, {
		loading,
		idle,
		error,
		success: children,
	}), [status, children, error, idle, loading])

	return <>{useRx(rx)}</>
}