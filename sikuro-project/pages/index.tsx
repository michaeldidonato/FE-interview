import { productsApi } from "@/store/api";

export default function Home() {
  const { data } = productsApi.useGetProductsQuery();

  console.log({ data });
  return <div>page</div>;
}
