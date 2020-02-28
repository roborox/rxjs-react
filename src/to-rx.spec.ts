import { LoadingState, toRx } from "./to-rx"

describe("toRx", () => {
	test("should emit 2 states", async () => {
		expect.assertions(4)
		const number = Math.random()
		const promise = Promise.resolve(number)

		let events: LoadingState<number>[] = []
		const state = toRx(promise)
		state.subscribe(next => events.push(next))
		await promise
		expect(events.length).toBe(2)
		expect(events[0].loading).toBe(true)
		expect(events[1].loading).toBe(false)
		expect(events[1].value).toBe(number)
	})

	test("should emit 2 states when error", async () => {
		expect.assertions(4)
		const number = Math.random()
		const promise = Promise.reject(number)

		let events: LoadingState<number>[] = []
		const state = toRx(promise)
		state.subscribe(next => events.push(next))
		await promise.catch(ex => Promise.resolve())
		expect(events.length).toBe(2)
		expect(events[0].loading).toBe(true)
		expect(events[1].loading).toBe(false)
		expect(events[1].error).toBe(number)
	})

})
