import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Box, Button, Typography } from "@mui/material";
import CartItem from "../CartItem/CartItem";
import { api } from "@/store/api";
import { deleteCart } from "@/store/slices/cartSlice";

const Cart = () => {
  const carts = useSelector((state: RootState) => state.cart);
  const [deleteCartMutation] = api.useDeleteCartMutation();
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const handleDeleteCart = async () => {
    await deleteCartMutation({ userId: userId ?? "" });

    dispatch(deleteCart());
  };

  return (
    <Box sx={{ minWidth: "500px" }}>
      <Typography variant="h4" sx={{ padding: "20px" }}>
        Cart
      </Typography>

      {carts.products.map((cart) => (
        <CartItem key={cart.id} product={cart} />
      ))}

      <Button onClick={handleDeleteCart} sx={{ my: 2, mx: 2 }} color="error">
        Elimina carrello
      </Button>
    </Box>
  );
};

export default Cart;
