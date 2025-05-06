import { Button, CardActions, IconButton } from "@mui/material";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { api } from "@/store/api";
import { CartActionsProps } from "./CartActions.models";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";

const CartActions = ({ productId }: CartActionsProps) => {
  const [count, setCount] = useState(1);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const cartStore = useSelector((state: RootState) => state.cart);

  console.log({ cartStore });

  const [addCartsMutation, {}] = api.useAddCartsMutation();

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count === 1) return;
    setCount((prevCount) => prevCount - 1);
  };

  const handleAddCart = async () => {
    const response = await addCartsMutation({
      userId: userId ?? "",
      quantity: count,
      productId: productId.toString(),
    });

    //store in a Redux store because the cart is not stored in the api POST call
    dispatch(addCart(response.data));

    setCount(1);
  };

  return (
    <CardActions
      sx={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}
    >
      <Button onClick={handleDecrement}>-</Button>
      <span>{count}</span>
      <Button onClick={handleIncrement}>+</Button>
      <Button variant="outlined" onClick={handleAddCart}>
        <AddShoppingCartIcon />
      </Button>
    </CardActions>
  );
};

export default CartActions;
