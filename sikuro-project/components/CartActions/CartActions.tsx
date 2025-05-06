import { Button, CardActions, IconButton } from "@mui/material";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { api } from "@/store/api";
import { CartActionsProps } from "./CartActions.models";

const CartActions = ({ productId }: CartActionsProps) => {
  const [count, setCount] = useState(1);
  const userId = localStorage.getItem("userId");

  const [addCartsMutation, {}] = api.useAddCartsMutation();
  const [cartsQuery] = api.endpoints.getCarts.useLazyQuery();

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  const handleAddCart = async () => {
    await addCartsMutation({
      userId: userId ?? "",
      quantity: count,
      productId: productId.toString(),
    });

    const response = await cartsQuery({ userId: userId ?? "" });

    console.log({ response });

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
