import React from "react"
import {render} from "@testing-library/react"
import {Atom} from "@grammarly/focal/dist/_cjs/src/atom"
import {RxBool} from "./rx-bool"
import {act} from "react-dom/test-utils"

describe("RxBool", () => {
	test("should render children if true", async() => {
		expect.assertions(2)
		const bool = Atom.create<boolean>(true)
		const r = render(<RxBool value={bool}><span data-testid="value">test string</span></RxBool>)
		await expect(r.findByTestId("value")).resolves.toBeTruthy()
		act(() => bool.set(false))
		await expect(r.findByTestId("value")).rejects.toBeTruthy()
	})

	test("should work with negate", async() => {
		expect.assertions(2)
		const bool = Atom.create<boolean>(false)
		const r = render(<RxBool value={bool} negate><span data-testid="value">test string</span></RxBool>)
		await expect(r.findByTestId("value")).resolves.toBeTruthy()
		act(() => bool.set(true))
		await expect(r.findByTestId("value")).rejects.toBeTruthy()
	})
})
