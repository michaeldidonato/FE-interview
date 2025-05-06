import Filters from "@/components/Filters/Filters";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import Products from "@/components/Products/Products";
import { api } from "@/store/api";
import usePageHook from "../store/hooks/usePageHook";
import { Box, Button, Drawer } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import Cart from "@/components/Cart/Cart";

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

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const { data, isLoading: isLoadginProducts } = api.useGetProductsQuery({
    limit,
    skip,
    category,
    search,
  });

  const { data: dataCategories, isLoading: isLoadingCategories } =
    api.useGetCategoriesQuery();

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
        <Drawer open={openDrawer} anchor="right" onClose={handleCloseDrawer}>
          <Cart />
        </Drawer>

        <Filters
          dataCategory={dataCategories ?? []}
          handleCategory={handleCategory}
          handleSearch={handleSearch}
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleOpenDrawer}
        >
          <ShoppingCartIcon />
        </Button>
      </Box>

      <Products dataProducts={data} />
      <PaginationComponent totalPages={totalPages} handleSkip={handleSkip} />
    </>
  );
}
