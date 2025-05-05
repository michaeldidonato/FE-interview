import { Button, CardActions, IconButton } from "@mui/material";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const CartActions = () => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count === 1) return;
    setCount(count - 1);
  };
  return (
    <CardActions
      sx={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}
    >
      <Button onClick={handleDecrement}>-</Button>
      <span>{count}</span>
      <Button onClick={handleIncrement}>+</Button>
      <IconButton>
        <AddShoppingCartIcon />
      </IconButton>
    </CardActions>
  );
};

export default CartActions;
