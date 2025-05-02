import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Products } from "./Products";
import { Pagination } from "./Pagination";

describe("Products", () => {
  it("should render products and pagination", async () => {
    const products = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
      { id: 3, name: "Product 3" },
    ];

    const { getByText, getAllByRole } = render(
      <div>
        <Products products={products} />
        <Pagination />
      </div>
    );

    // Verifica che i prodotti siano stati renderizzati
    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText("Product 2")).toBeInTheDocument();
    expect(getByText("Product 3")).toBeInTheDocument();

    // Verifica che la paginazione sia stata renderizzata
    const paginationButtons = getAllByRole("button");
    expect(paginationButtons.length).toBe(2); // prev e next

    // Simula il click sul pulsante "next"
    fireEvent.click(paginationButtons[1]);

    // Aspetta che la paginazione cambi
    await waitFor(() => {
      expect(getByText("Product 4")).toBeInTheDocument();
    });

    // Verifica che il prodotto 4 sia stato fetchato e renderizzato
    expect(getByText("Product 4")).toBeInTheDocument();
  });
});
