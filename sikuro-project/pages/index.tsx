import Filters from "@/components/Filters/Filters";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import Products from "@/components/Products/Products";
import { api } from "@/store/api";
import usePageHook from "../store/hooks/usePageHook";
import { Box, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

  const { data, isLoading: isLoadginProducts } = api.useGetProductsQuery({
    limit,
    skip,
    category,
    search,
  });

  const { data: dataCategories, isLoading: isLoadingCategories } =
    api.useGetCategoriesQuery();

  const userId = localStorage.getItem("userId");

  const { data: dataCarts } = api.useGetCartsQuery(
    { userId: userId ?? "" },
    { skip: !userId }
  );

  console.log({ dataCarts });

  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  if ([isLoadginProducts, isLoadingCategories].some(Boolean)) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          my: 4,
        }}
      >
        <Filters
          dataCategory={dataCategories ?? []}
          handleCategory={handleCategory}
          handleSearch={handleSearch}
        />

        <Button variant="contained" color="primary" size="large">
          <ShoppingCartIcon />
        </Button>
      </Box>

      <Products dataProducts={data} />
      <PaginationComponent totalPages={totalPages} handleSkip={handleSkip} />
    </>
  );
}
