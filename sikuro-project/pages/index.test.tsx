import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

// import { Pagination } from "./Pagination";
import Products from "@/components/Products/Products";
import { products } from "@/store/fakeData";

describe("Products", () => {
  it("should render products and pagination", async () => {
    const { getByText, getAllByRole } = render(
      <div>
        <Products dataProducts={products} />
        {/* <Pagination /> */}
      </div>
    );

    // Verifica che i prodotti siano stati renderizzati
    expect(getByText("Essence Mascara Lash Princess")).toBeInTheDocument();
    expect(getByText("Eyeshadow Palette with Mirror")).toBeInTheDocument();
    expect(getByText("Powder Canister")).toBeInTheDocument();

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
