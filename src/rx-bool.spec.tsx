import React from "react"
import {render} from "@testing-library/react"
import {Atom} from "@grammarly/focal/dist/_cjs/src/atom"
import {RxBool} from "./rx-bool"
import {act} from "react-dom/test-utils"

let counter = 0

function Count() {
	counter = counter + 1
	return <span data-testid="value">text</span>
}

describe("RxBool", () => {
	test("children are not rendered if not true", async () => {
		expect.assertions(4)
		const bool = Atom.create<boolean>(false)
		const r = render(<RxBool value={bool}><Count/></RxBool>)
		await expect(r.findByTestId("value")).rejects.toBeTruthy()
		expect(counter).toBe(0)
		act(() => bool.set(true))
		await expect(r.findByTestId("value")).resolves.toBeTruthy()
		expect(counter).toBe(1)
	})

	test("should render children if true", async () => {
		expect.assertions(2)
		const bool = Atom.create<boolean>(true)
		const r = render(<RxBool value={bool}><span data-testid="value">test string</span></RxBool>)
		await expect(r.findByTestId("value")).resolves.toBeTruthy()
		act(() => bool.set(false))
		await expect(r.findByTestId("value")).rejects.toBeTruthy()
	})

	test("should work with negate", async () => {
		expect.assertions(2)
		const bool = Atom.create<boolean>(false)
		const r = render(<RxBool value={bool} negate><span data-testid="value">test string</span></RxBool>)
		await expect(r.findByTestId("value")).resolves.toBeTruthy()
		act(() => bool.set(true))
		await expect(r.findByTestId("value")).rejects.toBeTruthy()
	})
})
