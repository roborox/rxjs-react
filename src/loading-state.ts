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
export const createLoadingStatusError = <T extends any>(error: T): LoadingStatusError => ({
	status: "error",
	error,
})

export type SuccessLoadingState<T> = {
	value: T,
	status: LoadingStatusSuccess
}
export type LoadingStateIdle = {
	value: null,
	status: LoadingStatusIdle
}
export type LoadingStateError = {
	value: null,
	status: LoadingStatusError
}
export type LoadingStateLoading = {
	value: null,
	status: LoadingStatusLoading
}

export type LoadingState<T> = LoadingStateLoading | SuccessLoadingState<T> | LoadingStateIdle | LoadingStateError

export const createLoadingStateIdle = <T extends any>(): LoadingState<T> => ({
	status: loadingStatusIdle,
	value: null,
})