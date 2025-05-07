import { Box, Button } from "@mui/material";
import { CartItemProps } from "./CartItem.models";
import { api } from "@/store/api";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemToCart } from "@/store/slices/cartSlice";

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useDispatch();
  const [modifyItemToCartMutation] = api.useAddItemToCartMutation();

  const removeFromCart = async () => {
    await modifyItemToCartMutation({
      userId: localStorage.getItem("userId") ?? "",
      quantity: product.quantity - 1,
      productId: product.id.toString(),
    });

    dispatch(
      removeItemToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  const addToCart = async () => {
    await modifyItemToCartMutation({
      userId: localStorage.getItem("userId") ?? "",
      quantity: product.quantity + 1,
      productId: product.id.toString(),
    });

    dispatch(
      addItemToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "Arial, Helvetica, sans-serif",
        borderBottom: "1px solid lightblue",
        padding: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <h3>{product.title}</h3>
        <div className="information">
          <p>Price: ${product.price}</p>
          <p>Total: ${(product.quantity * product.price).toFixed(2)}</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={removeFromCart}
          >
            -
          </Button>
          <p>{product.quantity}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={addToCart}
          >
            +
          </Button>
        </div>
      </div>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ maxWidth: "100px", objectFit: "cover" }}
      />
    </Box>
  );
};

export default CartItem;
