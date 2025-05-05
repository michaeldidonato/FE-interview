import Filters from "@/components/Filters/Filters";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import Products from "@/components/Products/Products";
import { productsApi } from "@/store/api";
import { useMemo, useState } from "react";
import usePageHook from "../store/hooks/usePageHook";

export default function Home() {
  const {
    limit,
    skip,
    category,
    search,
    handleSkip,
    handleCategory,
    handleSearch,
  } = usePageHook();

  const { data, isLoading: isLoadginProducts } =
    productsApi.useGetProductsQuery(
      { limit, skip, category, search },
      { refetchOnMountOrArgChange: true }
    );
  const { data: dataCategories, isLoading: isLoadingCategories } =
    productsApi.useGetCategoriesQuery();

  console.log({ dataCategories });

  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  if ([isLoadginProducts, isLoadingCategories].some((v) => !!v)) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Filters
        dataCategory={dataCategories}
        handleCategory={handleCategory}
        handleSearch={handleSearch}
      />
      <Products dataProducts={data} />
      <PaginationComponent totalPages={totalPages} handleSkip={handleSkip} />
    </>
  );
}
