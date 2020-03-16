import React from "react"
import { render } from "@testing-library/react"
import { Loader } from "./loader"
import { toRx } from "./to-rx"
import { act } from "react-dom/test-utils"
import { F } from "@grammarly/focal"
import { Rx } from "./rx"

describe("Loader", () => {
	test("should display loading if is loading", async () => {
		expect.assertions(2)
		const [, status] = toRx(new Promise<number>(() => {
		}))
		const r = render(
			<span data-testid="test">
				<Loader status={status} loading={<span>loading</span>}><span>content</span></Loader>
			</span>,
		)
		await expect(r.getByTestId("test")).toHaveTextContent("loading")
		await expect(r.getByTestId("test")).not.toHaveTextContent("content")
	})

	test("should display content if loaded", async () => {
		expect.assertions(2)
		let resolve: (value: number) => void
		const promise = new Promise<number>((res) => resolve = res)
		const [value, status] = toRx(promise)
		const r = render(
			<span data-testid="test">
				<Loader status={status} loading={<span>loading</span>}>
					<F.span>{value}</F.span>
				</Loader>
			</span>,
		)
		expect(r.getByTestId("test")).toHaveTextContent("loading")
		const number = Math.random()
		await act(async () => {
			resolve(number)
			await promise
		})
		expect(r.getByTestId("test")).toHaveTextContent(number.toString())
	})

	test("should work with <Rx /> component", async () => {
		expect.assertions(3)
		let resolve: (value: number) => void
		const promise = new Promise<number>((res) => resolve = res)
		const [value, status] = toRx(promise)
		const r = render(
			<span data-testid="test">
				<Loader status={status} loading={<span>loading</span>}>
					<Rx value={value}>
						{renderable => <span data-testid="content">{renderable}</span>}
					</Rx>
				</Loader>
			</span>,
		)
		expect(r.getByTestId("test")).toHaveTextContent("loading")
		const number = Math.random()
		await act(async () => {
			resolve(number)
			await promise
		})
		expect(r.getByTestId("content")).toBeTruthy()
		expect(r.getByTestId("content")).toHaveTextContent(number.toString())
	})
})
