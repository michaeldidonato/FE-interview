import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import Products from "@/components/Products/Products";
import { products } from "@/store/fakeData";
import PaginationComponent from "@/components/Pagination/PaginationComponent";

describe("Products", () => {
  it("should render products and pagination", async () => {
    const { getByText, getAllByRole, getByTestId } = render(
      <div>
        <Products dataProducts={products} />
        <PaginationComponent
          totalPages={2}
          handleSkip={() => {}}
          // data-testid="pagination-component"
        />
      </div>
    );

    // Verifica che i prodotti siano stati renderizzati
    expect(getByText("Essence Mascara Lash Princess")).toBeInTheDocument();
    expect(getByText("Eyeshadow Palette with Mirror")).toBeInTheDocument();
    expect(getByText("Powder Canister")).toBeInTheDocument();
  });
});
