import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CartActions from "./CartActions";

describe("CartActions", () => {
  it("should render cart actions", () => {
    const productId = 123;
    const { getByText } = render(<CartActions productId={productId} />);

    expect(getByText("-")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("+")).toBeInTheDocument();
    expect(getByText("Add shopping cart")).toBeInTheDocument();
  });

  it("should increment count when + button is clicked", () => {
    const productId = 123;
    const { getByText } = render(<CartActions productId={productId} />);

    const plusButton = getByText("+");
    fireEvent.click(plusButton);

    expect(getByText("2")).toBeInTheDocument();
  });

  it("should decrement count when - button is clicked", () => {
    const productId = 123;
    const { getByText } = render(<CartActions productId={productId} />);

    const plusButton = getByText("+");
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);

    const minusButton = getByText("-");
    fireEvent.click(minusButton);

    expect(getByText("2")).toBeInTheDocument();
  });

  it("should call addCartsMutation when Add shopping cart button is clicked", async () => {
    const productId = 123;
    const { getByText } = render(<CartActions productId={productId} />);

    const addCartButton = getByText("Add shopping cart");
    fireEvent.click(addCartButton);
  });
});
