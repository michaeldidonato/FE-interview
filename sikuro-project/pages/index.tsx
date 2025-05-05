import PaginationComponent from "@/components/Pagination/PaginationComponent";
import Products from "@/components/Products/Products";
import { productsApi } from "@/store/api";
import { useMemo, useState } from "react";

export default function Home() {
  const limit = 30;
  const [skip, setSkip] = useState<number>(0);

  const { data } = productsApi.useGetProductsQuery(
    { limit, skip },
    { refetchOnMountOrArgChange: true }
  );

  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  const handleSkip = (currentPage: number, nextPage: number) => {
    if (nextPage > currentPage) {
      const gap = nextPage - currentPage;
      setSkip(skip + limit * gap);
    } else {
      const gap = currentPage - nextPage;
      setSkip(skip - limit * gap);
    }
  };

  const { data: categories } = productsApi.useGetCategoriesQuery();

  return (
    <>
      <Products dataProducts={data} />
      <PaginationComponent totalPages={totalPages} handleSkip={handleSkip} />
    </>
  );
}
