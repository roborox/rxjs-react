import { toRx } from "./to-rx"
import { LoadingStatus } from "./loading-state"

describe("toRx", () => {
	test("should emit 2 states", async () => {
		expect.assertions(7)
		const number = Math.random()
		const promise = Promise.resolve(number)

		let events: LoadingStatus[] = []
		let values: number[] = []
		const [value, status] = toRx(promise)
		status.subscribe(next => events.push(next))
		value.subscribe(x => values.push(x))
		await promise
		expect(events.length).toBe(2)
		expect(values.length).toBe(1)
		expect(events[0].status).toBe("loading")
		expect(events[1].status).toBe("success")
		expect(values[0]).toBe(number)

		let events2: LoadingStatus[] = []
		status.subscribe(x => events2.push(x))
		expect(events2.length).toBe(1)
		expect(events2[0].status).toBe("success")
	})

	test("should emit 2 states when error", async () => {
		expect.assertions(4)
		const number = Math.random()
		const promise = Promise.reject(number)

		let events: LoadingStatus[] = []
		const [,status] = toRx(promise)
		status.subscribe(next => events.push(next))
		await promise.catch(() => Promise.resolve())
		expect(events.length).toBe(2)
		expect(events[0].status).toBe("loading")
		expect(events[1].status).toBe("error")
		// @ts-ignore
		expect(events[1].error).toBe(number)
	})
})
