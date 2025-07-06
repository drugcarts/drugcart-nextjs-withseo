"use client";
import CartIcon from "@/assets/Icons/CartIcon";
import { PostCartService } from "@/services/cartService";
import { useDispatch } from "react-redux";

const ClientCartButton = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(PostCartService(product));
  };

  return (
    <button onClick={handleAddToCart}>
      <CartIcon />
    </button>
  );
};

export default ClientCartButton;
