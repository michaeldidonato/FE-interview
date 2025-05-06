import { Product } from "@/store/types";
import { ProductsProps } from "./Products.models";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import style from "./Product.module.css";
import CartActions from "../CartActions/CartActions";

const Products = ({ dataProducts }: ProductsProps) => {
  return (
    <div className={style.mainContainerProduct}>
      {dataProducts?.products.map((product: Product) => (
        <Card sx={{ maxWidth: 345 }} key={product.id}>
          <CardHeader title={product.title} subheader={product.category} />
          <CardMedia
            component="img"
            height="250"
            image={product.thumbnail}
            alt={product.title}
          />
          <CardContent>
            {product.description}
            <br />${product.price}
          </CardContent>
          <CartActions productId={product.id} />
        </Card>
      ))}
    </div>
  );
};

export default Products;
