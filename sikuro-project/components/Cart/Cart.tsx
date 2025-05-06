import { useSelector } from "react-redux";
import { CartProps } from "./Cart.models";
import { RootState } from "@/store/store";
import { Box, Typography } from "@mui/material";
import CartItem from "../CartItem/CartItem";

const Cart = ({}: CartProps) => {
  const carts = useSelector((state: RootState) => state.cart);

  return (
    <Box sx={{ minWidth: "500px" }}>
      <Typography variant="h4" sx={{ padding: "20px" }}>
        Cart
      </Typography>

      {carts.products.map((cart) => (
        <CartItem key={cart.id} product={cart} />
      ))}

      <Typography variant="h5" sx={{ padding: "20px" }}>
        Total ${carts.total.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default Cart;
