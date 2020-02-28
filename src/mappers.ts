export function ifUndefined<T>(defaultValue: T) {
	return (undef: T | undefined) => undef === undefined ? defaultValue : undef
}
