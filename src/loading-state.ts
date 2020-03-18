export type LoadingStatusIdle = {
	status: "idle"
}
export type LoadingStatusSuccess = {
	status: "success"
}
export type LoadingStatusLoading = {
	status: "loading"
}
export type LoadingStatusError = {
	status: "error",
	error: any
}
export type LoadingStatus = LoadingStatusIdle | LoadingStatusLoading | LoadingStatusSuccess | LoadingStatusError

export const loadingStatusIdle: LoadingStatusIdle = {
	status: "idle",
}
export const loadingStatusLoading: LoadingStatusLoading = {
	status: "loading",
}
export const loadingStatusSuccess: LoadingStatusSuccess = {
	status: "success",
}
export const createLoadingStatusError = <T>(error: T): LoadingStatusError => ({
	status: "error",
	error,
})

export type LoadingState<T> = {
	value: T
	status: LoadingStatus
}

export const createLoadingStateIdle = <T>(emptyValue: T): LoadingState<T> => ({
	status: loadingStatusIdle,
	value: emptyValue,
})
