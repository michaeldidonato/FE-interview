import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Filters from "./Filters";

describe("Filters", () => {
  it("should render filters", () => {
    const dataCategory = [
      {
        slug: "beauty",
        name: "Beauty",
        url: "https://dummyjson.com/products/category/beauty",
      },
      {
        slug: "fragrances",
        name: "Fragrances",
        url: "https://dummyjson.com/products/category/fragrances",
      },
    ];

    const { getByText, getAllByRole } = render(
      <Filters
        dataCategory={dataCategory}
        handleCategory={() => {}}
        handleSearch={() => {}}
      />
    );

    // Verifica che i filtri siano stati renderizzati
    expect(getByText("Beauty")).toBeInTheDocument();
    expect(getByText("Fragrances")).toBeInTheDocument();
  });
});
