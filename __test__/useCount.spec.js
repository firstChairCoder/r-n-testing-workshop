import React from "react";
import {
  act,
  fireEvent,
  getByTestId,
  render,
} from "@testing-library/react-native";
import CounterWithHook from "../src/components/CounterWithHook";
import useCount from "../src/hooks/useCount";
import { renderHook } from "@testing-library/react-hooks";

//testing with the component
it("should expose the count and both increment & decrement functions", () => {
  const { getByText, getByTestId, debug } = render(<CounterWithHook />);
  // debug()
  const decrement = getByTestId(/decrement/i);
  const increment = getByTestId(/increment/i);
  const counterText = getByText(/Current count:/i);

  expect(counterText.props.children).toEqual(["Current count: ", 0]);
  fireEvent.press(increment);
  expect(counterText.props.children).toEqual(["Current count: ", 1]);
  fireEvent.press(decrement);
  expect(counterText.props.children).toEqual(["Current count: ", 0]);
});

function setup({ initialProps } = {}) {
  const result: any = { current: null };
  function TestComponent(props) {
    result.current = useCount(props);
    return null;
  }
  render(<TestComponent {...initialProps} />);
  return result;
}

//testing without component
test("exposes the count and increment/decrement functions", () => {
  const result = setup();
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("allows customization of the initial count", () => {
  const result = setup({ initialProps: { initialCount: 3 } });
  expect(result.current.count).toBe(3);
});

test("allows customization of the step", () => {
  const result = setup({ initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("exposes the count and increment/decrement functions", () => {
  const { result } = renderHook(useCount);
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});
