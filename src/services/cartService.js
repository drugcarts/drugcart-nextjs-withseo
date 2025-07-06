import axios from "axios";
import Authorization from "../utils/authorization";
import { IsLoading, showToast } from "../reduxToolkit/slices/commonSlice";
import {
  addToCart,
  getCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../reduxToolkit/slices/cartSlice";

const getCartService = () => async (dispatch) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    await axios
      .get("/api/cart", {
        headers: await Authorization(),
        // withCredentials: true,
      })
      .then((response) => {
        dispatch(getCart(response.data));
        // localStorage.setItem('cart', cart);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  }
};

const PostCartService = (data) => async (dispatch) => {
  console.log(data, "OPPPP 11");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    dispatch(addToCart(data));
    dispatch(
      showToast({ message: "Cart added Successfully!!!", severity: "success" })
    );
    return;
  }

  try {
    dispatch(IsLoading(true));
    const postData = await axios.post("/api/cart", data, {
      headers: await Authorization(),
    });
    dispatch(addToCart(postData.data));
    dispatch(
      showToast({
        message: "Cart added Successfully!!!",
        severity: "success",
      })
    );
  } catch (error) {
    if (error?.response?.data?.error !== "Unauthorized") {
      localStorage.removeItem("cart");
      dispatch(
        showToast({
          message: error?.response?.data?.error || "Failed to add to cart",
          severity: "error",
        })
      );
    }
    console.error("Cart error:", error.message);
  } finally {
    dispatch(getCartService());
    dispatch(IsLoading(false));
  }
};

const CartIncrementService = (id, userData) => async (dispatch) => {
  dispatch(incrementQuantity(id));
  await axios
    .put(`/api/cart/${id}`, userData, {
      headers: await Authorization(),
      // withCredentials: true,
    })
    .then((response) => {
      dispatch(getCartService());
      localStorage.removeItem("cart");
      dispatch(
        showToast({ message: "Updated Successfully!!!", severity: "success" })
      );
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

const CartDecrementService = (id, userData) => async (dispatch) => {
  dispatch(decrementQuantity(id));
  await axios
    .put(`/api/cart/${id}`, userData, {
      headers: await Authorization(),
      // withCredentials: true,
    })
    .then((response) => {
      dispatch(getCartService());
      localStorage.removeItem("cart");
      dispatch(
        showToast({ message: "Updated Successfully!!!", severity: "success" })
      );
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

const DeleteCartService = (id) => async (dispatch) => {
  dispatch(removeFromCart(id));
  await axios
    .delete(`/api/cart/${id}`, {
      headers: await Authorization(),
      // withCredentials: true,
    })
    .then(() => {
      dispatch(getCartService());
      localStorage.removeItem("cart");
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

export {
  getCartService,
  PostCartService,
  CartIncrementService,
  CartDecrementService,
  DeleteCartService,
};
