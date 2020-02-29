import React from "react"
import { render } from "@testing-library/react"
import { Atom } from "@grammarly/focal/dist/_cjs/src/atom"
import { RxIf } from "./rx-if"
import { act } from "react-dom/test-utils"

let counter = 0

function Count() {
	counter = counter + 1
	return <span data-testid="value">text</span>
}

function Test({value}: {value: string}) {
	return <span data-testid="value">{value}</span>
}

describe("RxIf", () => {
	test("children are not rendered if test is not true", async () => {
		expect.assertions(4)
		const bool = Atom.create<boolean>(false)
		const r = render(<RxIf test={bool}><Count/></RxIf>)
		await expect(r.findByTestId("value")).rejects.toBeTruthy()
		expect(counter).toBe(0)
		act(() => bool.set(true))
		await expect(r.findByTestId("value")).resolves.toBeTruthy()
		expect(counter).toBe(1)
	})

	test("should render children if true", async () => {
		expect.assertions(2)
		const bool = Atom.create<boolean>(true)
		const r = render(<RxIf test={bool}><span data-testid="value">test string</span></RxIf>)
		await expect(r.findByTestId("value")).resolves.toBeTruthy()
		act(() => bool.set(false))
		await expect(r.findByTestId("value")).rejects.toBeTruthy()
	})

	test("should work with negate", async () => {
		expect.assertions(2)
		const bool = Atom.create<boolean>(false)
		const r = render(<RxIf test={bool} negate><span data-testid="value">test string</span></RxIf>)
		await expect(r.findByTestId("value")).resolves.toBeTruthy()
		act(() => bool.set(true))
		await expect(r.findByTestId("value")).rejects.toBeTruthy()
	})

	test("should render else part if not true", () => {
		const bool = Atom.create<boolean>(true)
		const r = render(<RxIf test={bool} else={() => <Test value="false"/>}><Test value="true"/></RxIf>)
		expect(r.getByTestId("value")).toHaveTextContent("true")
		act(() => bool.set(false))
		expect(r.getByTestId("value")).toHaveTextContent("false")
	})

})
