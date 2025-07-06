import axios from "axios";
import { getProfile } from "../reduxToolkit/slices/profileSlice";
import Authorization from "../utils/authorization";
import { IsLoading } from "@/reduxToolkit/slices/commonSlice";
import { GetAddressIdService } from "./addressService";
import { mergeCartAfterLogin } from "@/reduxToolkit/slices/cartSlice";

const getProfileService = () => async (dispatch, getState) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    dispatch(IsLoading(true));
    await axios
      .get("/api/profile", {
        headers: await Authorization(),
        withCredentials: true,
      })
      .then((response) => {
        dispatch(getProfile(response.data));
        dispatch(GetAddressIdService(response.data?._id));
        // localStorage.removeItem("cart")
        dispatch(IsLoading(false));
        const guestCart = getState().cartData.items;
        console.log("guestCart", guestCart);
        dispatch(mergeCartAfterLogin(guestCart));
      })
      .catch((error) => {
        console.log("error", error.message);
        dispatch(IsLoading(false));
      });
  }
};

const GetProfileIdService = (id) => async (dispatch) => {
  try {
    dispatch(IsLoading(true));
    const getIdData = await axios.get(`/api/profile/${id}`, {
      headers: await Authorization(),
      withCredentials: true,
    });
    dispatch(getProfile(getIdData.data));
    dispatch(IsLoading(false));
  } catch (error) {
    dispatch(IsLoading(false));
    console.log("error", error.message);
  }
};

const PutProfileService = (id, userData) => async (dispatch) => {
  await axios
    .put(`/api/profile/${id}`, userData, {
      headers: await Authorization(),
      withCredentials: true,
    })
    .then((response) => {
      dispatch(getProfile(response.data));
      dispatch(GetProfileIdService(response.data?._id));
      dispatch(
        showToast({ message: "Updated Successfully!!!", severity: "success" })
      );
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

export { getProfileService, GetProfileIdService, PutProfileService };
