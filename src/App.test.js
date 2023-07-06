import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders the initial counter value", () => {
    const { getByTestId } = render(<App />);
    const counterValue = getByTestId("counter-value");
    expect(counterValue.textContent).toBe("0");
  });

  test("increments the counter when the increment button is clicked", () => {
    const { getByText, getByTestId } = render(<App />);
    const incrementButton = getByText("Increment");
    fireEvent.click(incrementButton);
    const counterValue = getByTestId("counter-value");
    expect(counterValue.textContent).toBe("1");
  });

  test("decrements the counter when the decrement button is clicked", () => {
    const { getByText, getByTestId } = render(<App />);
    const decrementButton = getByText("Decrement");
    fireEvent.click(decrementButton);
    const counterValue = getByTestId("counter-value");
    expect(counterValue.textContent).toBe("-1");
  });

  test("disables the decrement button when the counter is 0", () => {
    const { getByText } = render(<App />);
    const decrementButton = getByText("Decrement");
    expect(decrementButton).toBeDisabled();
  });

  test("adds a new item to the list when the form is submitted", () => {
    const { getByLabelText, getByTestId, getByText } = render(<App />);
    const newItemInput = getByLabelText("Create List Item");
    const addItemButton = getByTestId("add-item");

    fireEvent.change(newItemInput, { target: { value: "New Item" } });
    fireEvent.click(addItemButton);

    const listItem = getByText("New Item");
    expect(listItem).toBeInTheDocument();
  });

  test("removes an item from the list when the remove button is clicked", () => {
    const { getByLabelText, getByTestId, queryByText } = render(<App />);
    const newItemInput = getByLabelText("Create List Item");
    const addItemButton = getByTestId("add-item");

    fireEvent.change(newItemInput, { target: { value: "Item to remove" } });
    fireEvent.click(addItemButton);

    const removeButton = getByTestId("remove-item0");
    fireEvent.click(removeButton);

    const listItem = queryByText("Item to remove");
    expect(listItem).toBeNull();
  });
});
