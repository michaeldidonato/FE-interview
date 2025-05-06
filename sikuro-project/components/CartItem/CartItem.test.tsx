import { render } from "@testing-library/react";
import CartItem from "./CartItem";

describe("CartItem", () => {
  const product = {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    price: 19.99,
    quantity: 3,
    total: 59.97,
    discountPercentage: 18.19,
    discountedPrice: 49,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
  };

  it("renders product title", () => {
    const { getByText } = render(<CartItem product={product} />);
    expect(getByText(product.title)).toBeInTheDocument();
  });

  it("renders product quantity", () => {
    const { getByText } = render(<CartItem product={product} />);
    expect(getByText(`${product.quantity}`)).toBeInTheDocument();
  });
});
