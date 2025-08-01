// components/productinfo/productDetails.jsx
"use client";
import Image from "next/image";
import { IMAGES } from "../common/images";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CartDecrementService,
  CartIncrementService,
  getCartService,
  PostCartService,
} from "@/services/cartService";
import MostSearchCategory from "@/components/home/leftsection/MostSearchCategory";
import LeftService from "@/components/home/leftsection/LeftService";
import LeftScan from "@/components/home/leftsection/LeftScan";
import LeftHealthDevice from "@/components/home/leftsection/LeftHealthDevice";
import RightAyushCategory from "@/components/home/rightsection/RightAyushCategory";
import RightOurCare from "@/components/home/rightsection/RightOurCare";
import RightHealthStore from "@/components/home/rightsection/RightHealthStore";
import RightOurService from "@/components/home/rightsection/RightOurService";
import OurHomeService from "@/components/home/rightsection/OurHomeService";
import OurTreatment from "@/components/home/rightsection/OurTreatment";
import ReportErrorCard from "@/components/home/ReportErrorCard";
import QuestionCard from "@/components/home/QuestionCard";

const ProductDetails = ({
  product,
  alterBrands,
  storageid,
  packid,
  manufactuerurl,
  sideeffectGeneric,
}) => {
  const dispatch = useDispatch(); // ✅ Missing dispatch definition
  const router = useRouter(); // ✅ You were using router without defining it

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    dispatch(getCartService());
  }, [dispatch]);
  // ✅ Best practice: include dependencies

  const { carts, items } = useSelector((state) => state.cartData);
  const onAuth = items.length > 0 ? items : carts?.carts || [];

  const checkoutClick = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  const uploadClick = async () => {
    router.push("/prescription");
  };

  const cartDetails = onAuth?.filter(
    (cartItem) => cartItem?.url === product?.url
  );

  const ProductImage = ({ product, width, height, className }) => {
    const primaryImage = product?.product_img
      ? `https://assets2.drugcarts.com/${product.product_img}`
      : null;

    const fallbackImage = product?.product_img
      ? `https://drugcarts-nextjs.s3.ap-south-1.amazonaws.com/${product.product_img}`
      : null;

    const [imgSrc, setImgSrc] = useState(primaryImage || IMAGES.NO_IMAGE);

    const handleError = () => {
      if (imgSrc !== fallbackImage && fallbackImage) {
        setImgSrc(fallbackImage);
      } else {
        setImgSrc(IMAGES.NO_IMAGE);
      }
    };
    return (
      <Image
        priority
        src={imgSrc}
        alt={product?.product_name || "Product Image"}
        width={width}
        height={height}
        className={className}
        onError={handleError}
      />
    );
  };

  return (
    <>
      <section className="px-3 mt-3">
        <section className="px-5 mt-3 bg-[#F9F9F9] p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
            <div className="bg-white p-3 rounded-md">
              <ProductImage
                product={product}
                width={300}
                height={280}
                className="p-2 w-[300px] h-[280px] my-1 mx-auto"
              />
              <div className="flex items-center justify-between mt-4 p-2">
                <ProductImage
                  product={product}
                  width={120}
                  height={120}
                  className="border-2 border-gray-300 p-2 w-[120px] h-[100px] mx-auto"
                />
                <ProductImage
                  product={product}
                  width={120}
                  height={120}
                  className="border-2 border-gray-300 p-2 w-[120px] h-[100px] mx-auto"
                />
                <ProductImage
                  product={product}
                  width={120}
                  height={120}
                  className="border-2 border-gray-300 p-2 w-[120px] h-[100px] mx-auto"
                />
              </div>
            </div>
            <div className="p-1">
              <p className="text-sm text-gray-500 capitalize">
                {product?.cat_name}{" "}
              </p>
              <h2 className="text-xl">{product?.product_name}</h2>
              <div className="flex items-center mt-2">
                <span className="text-black font-bold mr-2">4.0</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-gray-500">&#9733;</span>
                <span className="text-black text-xs ml-1">(+2k reviews)</span>
              </div>
              <div className="flex items-center mt-2 gap-5">
                <h3 className="text-[#1877F2] font-bold text-lg line-through">
                  M.R.P :&#8377;{product?.price}
                </h3>
                <h3 className="text-[#4CAF50] font-bold text-lg">
                  &#8377;{product?.percentage} %
                </h3>
              </div>
              <div className="flex items-center mt-2 gap-3">
                <h3 className="text-[#B7084B] font-bold text-lg md:text-2xl">
                  &#8377;{product?.saleprice}
                </h3>
                <h3 className="text-md">(inclusive of all taxes)</h3>
              </div>
              <div className="items-center mt-2 gap-3">
                {product?.price && product?.saleprice ? (
                  <h3 className="text-[#4CAF50] font-bold text-md md:text-lg">
                    Your saved: ₹
                    {(product.price - product.saleprice).toFixed(2)}
                  </h3>
                ) : null}
              </div>
              {cartDetails?.[0]?.quantity ? (
                <div className="flex items-center mt-3 gap-3 bg-white p-3 w-76 md:w-80 rounded-lg">
                  <h3 className="font-bold text-sm md:text-md">Qty</h3>
                  <div className="flex items-center text-sm md:text-md gap-5 bg-pink-100 px-2 py-[0.5px] rounded-md">
                    <svg
                      onClick={() => {
                        if (cartDetails?.[0]?.quantity > 1) {
                          dispatch(
                            CartDecrementService(cartDetails?.[0]?._id, {
                              quantity: cartDetails?.[0]?.quantity - 1,
                            })
                          );
                        }
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                    <p>{cartDetails?.[0]?.quantity}</p>
                    <svg
                      onClick={() =>
                        dispatch(
                          CartIncrementService(cartDetails?.[0]?._id, {
                            quantity: cartDetails?.[0]?.quantity + 1,
                          })
                        )
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                  <p className="text-xs md:text-md">{packid?.packagename}</p>
                </div>
              ) : null}
              <div className="flex items-center gap-3 mt-3">
                <button
                  className="bg-[#4CAF50] hover:bg-blue-600 text-white font-poppins font-semibold text-[12px] py-1 px-3 rounded shadow-md"
                  onClick={() => dispatch(PostCartService(product))}
                >
                  <div className="flex justify-center items-center gap-1">
                    <svg
                      className="w-6 h-6 text-white dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="text-md">Add to cart</span>
                  </div>
                </button>
                <button
                  className="bg-[#B7084B] hover:bg-blue-600 text-white font-poppins font-semibold text-[12px] py-1 px-4 rounded shadow-md"
                  onClick={() => router.push("/cart")}
                >
                  <div className="flex justify-center items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    <span className="text-md">Buy Now</span>
                  </div>
                </button>
              </div>
              <div className="mt-3">
                {product?.stock === "In Stock" ? (
                  <h3 className="font-bold text-md">
                    Availability :{" "}
                    <span className="text-[#B7084B]">{product?.stock}</span>
                  </h3>
                ) : (
                  <div className="flex items-center gap-5">
                    <h3 className="font-bold text-md">
                      Availability :{" "}
                      <span className="text-[#B7084B]">{product?.stock}</span>
                    </h3>
                    <h3
                      className="bg-blue-600 font-semibold text-sm py-1 px-1 rounded-lg text-white cursor-pointer"
                      onClick={() => router.push(`/notify/${product?.url}`)}
                    >
                      Get Notify
                    </h3>
                  </div>
                )}
                {product?.paymenttype !== "" ? (
                  <h3 className="text-[14px] py-1">{product?.paymenttype}</h3>
                ) : null}

                {product?.retunpolicy !== "" ? (
                  <h3 className="text-[14px]">
                    {product?.retunpolicy}{" "}
                    <span
                      className="text-[10px] text-gray-600 cursor-pointer"
                      onClick={() =>
                        router.push("/cancellation-return-refund-policy")
                      }
                    >
                      Read more
                    </span>
                  </h3>
                ) : null}

                {product?.cat_name === "ayush" ||
                product?.cat_name === "Health-Care-Device" ||
                product?.cat_name === "treatments" ||
                product?.cat_name === "fitness-supplements" ||
                product?.cat_name === "personal-care" ? null : (
                  <p className="bg-[#ff5c02] py-1 px-1 text-center rounded-lg text-white mt-2 w-48">
                    Prescription Required
                  </p>
                )}

                <h3 className="font-bold mt-2 text-xl">Share</h3>
                <div className="flex flex-col md:flex-row gap-3 mt-2">
                  <button className="flex items-center gap-1 border-2  py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="text-[#4C4C95]"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                    >
                      <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23c12.683,0,23-10.317,23-23S37.683,2,25,2z M32,16h-3.29 C26.772,16,26,16.455,26,17.806V21h6l-1,5h-5v13h-6V26h-3v-5h3v-2.774C20,14.001,21.686,11,26.581,11C29.203,11,32,12,32,12V16z" />
                    </svg>{" "}
                    <span className="text-[#4C4C95] text-[12px] pr-[3px]">
                      Facebook
                    </span>
                  </button>
                  <button className="flex items-center gap-1 border-2 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                      className="text-[#4CAF50]"
                    >
                      <path d="M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z" />
                    </svg>
                    <span className="text-[#4CAF50] text-[12px] pr-[3px]">
                      Whatsapp
                    </span>
                  </button>
                  <button className="flex items-center gap-1 border-2  py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="text-[#F24E1E]"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                    >
                      <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M18,35h-4V20h4V35z M16,17 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C18,16.105,17.105,17,16,17z M37,35h-4v-5v-2.5c0-1.925-1.575-3.5-3.5-3.5 S26,25.575,26,27.5V35h-4V20h4v1.816C27.168,20.694,28.752,20,30.5,20c3.59,0,6.5,2.91,6.5,6.5V35z" />
                    </svg>
                    <span className="text-[#F24E1E] text-[12px] pr-[3px]">
                      Pinterest
                    </span>
                  </button>
                  <button className="flex items-center gap-1 border-2 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="text-[#1D9BF0]"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                    >
                      <path d="M25,2C12.3178711,2,2,12.3178711,2,25c0,9.8841553,6.2675781,18.3302612,15.036377,21.5769653	c-0.2525635-2.2515869-0.2129517-5.9390259,0.2037964-7.7243652c0.3902588-1.677002,2.5212402-10.6871338,2.5212402-10.6871338	s-0.6433105-1.2883301-0.6433105-3.1911011c0-2.9901733,1.7324219-5.2211914,3.8898315-5.2211914	c1.8349609,0,2.7197876,1.3776245,2.7197876,3.0281982c0,1.8457031-1.1734619,4.6026611-1.78125,7.1578369	c-0.506897,2.1409302,1.0733643,3.8865356,3.1836548,3.8865356c3.821228,0,6.7584839-4.0296021,6.7584839-9.8453369	c0-5.147583-3.697998-8.7471924-8.9795532-8.7471924c-6.1167603,0-9.7072754,4.588562-9.7072754,9.3309937	c0,1.8473511,0.7111816,3.8286743,1.6000977,4.9069824c0.175293,0.2133179,0.2009277,0.3994141,0.1488647,0.6160278	c-0.1629028,0.678894-0.5250854,2.1392822-0.5970459,2.4385986c-0.0934448,0.3944702-0.3117676,0.4763184-0.7186279,0.2869263	c-2.685791-1.2503052-4.364502-5.1756592-4.364502-8.3295898c0-6.7815552,4.9268188-13.0108032,14.206543-13.0108032	c7.4588623,0,13.2547607,5.3138428,13.2547607,12.4179077c0,7.4100342-4.6729126,13.3729858-11.1568604,13.3729858	c-2.178894,0-4.2263794-1.132019-4.9267578-2.4691772c0,0-1.0783081,4.1048584-1.3404541,5.1112061	c-0.4524536,1.7404175-2.3892822,5.3460083-3.3615723,6.9837036C20.1704712,47.6074829,22.5397949,48,25,48	c12.6826172,0,23-10.3173828,23-23C48,12.3178711,37.6826172,2,25,2z" />
                    </svg>
                    <span className="text-[#1D9BF0] text-[12px] pr-[3px]">
                      Pinterest
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-1">
              <table className="table-auto text-[12px] w-[100%]">
                <thead>
                  <tr className="border-[1px] bg-white">
                    <th colSpan={2} className="text-lg mx-auto text-center">
                      Product Details
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1 font-bold">
                      Brand Name
                    </td>
                    <td className="px-2">{product?.product_name}</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1 font-bold">
                      Salt Composition
                    </td>
                    <td className="px-2">{product?.genericname}</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1 font-bold">
                      Strength
                    </td>
                    <td className="px-2">{product?.strength}</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1 font-bold">
                      Product Form
                    </td>
                    <td className="px-2 capitalize">
                      {product?.tabscount} {product?.form}
                    </td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1 font-bold">
                      Pack
                    </td>
                    <td className="px-2">{packid?.packagename}</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1 font-bold">
                      Storage
                    </td>
                    <td className="px-2">{storageid.storagename}</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1 font-bold">
                      Manufacturer
                    </td>
                    <td className="px-2">{manufactuerurl?.manufactuername}</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1 font-bold">
                      Country of Origin
                    </td>
                    <td className="px-2">{product?.orgin}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </section>
      <section className="px-3 mt-5">
        <div className="grid grid-cols-6 gap-4">
          <div className="md:col-span-1 col-span-6 order-2 md:order-1">
            <h2 className="font-bold hidden md:block">Product Summary</h2>
            <div className="bg-[#e7ecf6] text-[14px] hidden md:block">
              <ul className="list-disc pl-4 m-2 leading-10">
                <li>Overview</li>
                <li>
                  <button
                    onClick={() => scrollToSection("description")}
                    className="text-blue-600 hover:underline"
                  >
                    Description
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("uses")}
                    className="text-blue-600 hover:underline"
                  >
                    Uses
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("benefits")}
                    className="text-blue-600 hover:underline"
                  >
                    Benefit
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("indication")}
                    className="text-blue-600 hover:underline"
                  >
                    Indication
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("mechanism")}
                    className="text-blue-600 hover:underline"
                  >
                    Mechanism
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("works")}
                    className="text-blue-600 hover:underline"
                  >
                    How to Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contriaindication")}
                    className="text-blue-600 hover:underline"
                  >
                    Contriaindication
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("sideeffect")}
                    className="text-blue-600 hover:underline"
                  >
                    Side Effects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("warning")}
                    className="text-blue-600 hover:underline"
                  >
                    General Warning
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("child")}
                    className="text-blue-600 hover:underline"
                  >
                    Use of Tablet in Child
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("adult")}
                    className="text-blue-600 hover:underline"
                  >
                    Use of Tablet in Adult
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("elder")}
                    className="text-blue-600 hover:underline"
                  >
                    Use of Tablet in Elder
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("general")}
                    className="text-blue-600 hover:underline"
                  >
                    General Instructions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("drug")}
                    className="text-blue-600 hover:underline"
                  >
                    Drug Instructions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("overdose")}
                    className="text-blue-600 hover:underline"
                  >
                    Over Dose
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("misseddose")}
                    className="text-blue-600 hover:underline"
                  >
                    Missed Dose
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("doctor")}
                    className="text-blue-600 hover:underline"
                  >
                    Doctor Consult
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="text-blue-600 hover:underline"
                  >
                    FAQ's
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("storage")}
                    className="text-blue-600 hover:underline"
                  >
                    Storage
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("fasttag")}
                    className="text-blue-600 hover:underline"
                  >
                    Fast Tag
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("reference")}
                    className="text-blue-600 hover:underline"
                  >
                    Reference
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("expires")}
                    className="text-blue-600 hover:underline"
                  >
                    Expires on or after
                  </button>
                </li>
              </ul>
            </div>
            <h2 className="text-xl font-bold m-3">Author Details</h2>
            <div className="text-center border-2">
              <Image
                src={IMAGES.JEEVITHA}
                alt="Description"
                className="w-16 h-16 mx-auto p-2"
              />
              <p className="text-[12px] font-bold">Written by</p>
              <h2 className="text-[14px] font-bold">Dr.Sreeramdas Jeevitha</h2>
              <h3 className="text-[14px] font-bold">Pharm.D,</h3>
            </div>
            <div className="text-center border-2 border-t-0">
              <Image
                src={IMAGES.DRPREMANANTH}
                alt="Description"
                className="w-16 h-16 mx-auto p-2"
              />
              <p className="text-[12px] font-bold">Reviewed by</p>
              <h2 className="text-[14px] font-bold">Dr. Premanandh</h2>
              <h3 className="text-[14px] font-bold">M.B.B.S</h3>
            </div>
            <h2 className="text-xl font-bold my-5 text-center">
              Share With Your Friends
            </h2>
            <div className="border-2 text-[14px]">
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.WHATSAPP}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Whatsapp</h3>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.FACEBOOK}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Facebook</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.INSTAGRAM}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Instagram</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.PINTEREST}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Pinterest</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.LINKEDIN}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Linkedin</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.TELEGRAM}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Telegram</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.TWITTER}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Twitter</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.VIMEO}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Vimeo</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.YOUTUBE}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Youtube</h3>
                <div className="border-2"></div>
              </div>
            </div>
            <h2 className="text-xl font-bold my-5 text-center">
              Download Our Application
            </h2>
            <div className="border-2 p-3">
              <Image
                priority
                src={IMAGES.APPSTORE}
                alt="call us"
                className="w-26 object-cover my-5"
              />
              <Image
                priority
                src={IMAGES.APPGOOGLEPAY}
                alt="call us"
                className="w-26 object-cover"
              />
            </div>
            <h2 className="text-xl font-bold my-5 text-center">Last Updated</h2>
            <div className="border-2 p-3">
              <div className="flex gap-2 pb-3 border-b-2">
                <Image
                  src={IMAGES.DATE}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h3 className="text-md font-bold">22 Feb, 2024</h3>
              </div>
              <div className="flex gap-2 pt-3">
                <Image
                  src={IMAGES.TIME}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h3 className="text-md font-bold">22 Feb, 2024</h3>
              </div>
            </div>
            <h2 className="text-xl font-bold my-5 text-center">Feedback</h2>
            <div className="border-2 p-3">
              <h2 className="text-xl font-bold my-2 text-center">
                Did you find this helpful ?
              </h2>
              <p className="text-sm text-gray-400">
                Your feedback will help to improve the product
              </p>
              <div className="flex justify-center items-center gap-2 border-2 my-3">
                <Image
                  src={IMAGES.THUMBSUP}
                  alt="Description"
                  className="w-[30px] md:w-[50px]"
                />
                <h3 className="text-lg md:text-2xl font-bold">Yes</h3>
              </div>
              <div className="flex justify-center items-center gap-2 border-2 my-3">
                <Image
                  src={IMAGES.THUMBSDOWN}
                  alt="Description"
                  className="w-[30px] md:w-[50px]"
                />
                <h3 className="text-lg md:text-2xl font-bold">No</h3>
              </div>
            </div>
            <h2 className="text-2xl font-bold my-5 text-center">
              Something doesn’t feel right ?
            </h2>
            <ReportErrorCard />
            <h2 className="text-2xl font-bold my-5 text-center">
              Most search Medicine Categories
            </h2>
            <MostSearchCategory />
            <h2 className="text-2xl font-bold my-5 text-center">Service</h2>
            <LeftService />
            <h2 className="text-2xl font-bold my-5 text-center">
              Online Consult
            </h2>
            <div className="text-sm border-2 p-2">
              <div className="text-center">
                <Image
                  src={IMAGES.ONLINEDOCTOR}
                  alt="Online Doctor"
                  priority
                  className="w-32 mx-auto"
                />
                <button className="bg-green-500 p-1 rounded-md text-white">
                  Consult a Doctor Online
                </button>
              </div>
            </div>
            <h2 className="text-2xl font-bold my-5 text-center">Book Lab</h2>
            <div className="text-sm border-2 p-2">
              <div className="text-center">
                <Image
                  src={IMAGES.LABTEST}
                  alt="Lab Test"
                  priority
                  className="w-32 mx-auto"
                />
                <button className="bg-green-500 p-1 rounded-md text-white">
                  Book Lab Test Online
                </button>
              </div>
            </div>
            <h2 className="text-2xl font-bold my-5 text-center">Scan</h2>
            <LeftScan />
            <h2 className="text-2xl font-bold my-5 text-center">
              Health Device
            </h2>
            <LeftHealthDevice />
            <h2 className="text-2xl font-bold my-5 text-center">OTC Product</h2>
            <div className="bg-[#E6F5F5] text-sm">
              <div className="p-2 border-b-2 border-gray-300">
                <Link href="/sanitization" className="flex gap-2">
                  <Image
                    src={IMAGES.HANDSANITIZER}
                    alt="Hand Sanitier"
                    priority
                    className="w-6 bg-white"
                  />
                  <h2 className="text-md font-bold">Hand Sanitier</h2>
                </Link>
              </div>
              <div className="p-2 border-b-2 border-gray-300">
                <Link href="/" className="flex gap-2">
                  <Image
                    src={IMAGES.SKINTREATMENT}
                    alt="Skin Treatment"
                    priority
                    className="w-6 bg-white"
                  />
                  <h2 className="text-md font-bold">Skin Treatment</h2>
                </Link>
              </div>
              <div className="p-2 border-b-2 border-gray-300">
                <Link href="/" className="flex gap-2">
                  <Image
                    src={IMAGES.VITAMINS}
                    alt="Vitamins & Supplements"
                    priority
                    className="w-6 bg-white"
                  />
                  <h2 className="text-md font-bold">Vitamins & Supplements</h2>
                </Link>
              </div>
              <div className="p-2 border-b-2 border-gray-300">
                <Link href="/" className="flex gap-2">
                  <Image
                    src={IMAGES.WOMENCARE}
                    alt="Women Care"
                    priority
                    className="w-6 bg-white"
                  />
                  <h2 className="text-md font-bold">Women Care</h2>
                </Link>
              </div>
              <div className="p-2 border-b-2 border-gray-300">
                <Link href="/" className="flex gap-2">
                  <Image
                    src={IMAGES.BABYCARE}
                    alt="Baby Care"
                    priority
                    className="w-6 bg-white"
                  />
                  <h2 className="text-md font-bold">Baby Care</h2>
                </Link>
              </div>
              <div className="p-2 border-b-2 border-gray-300">
                <Link href="/" className="flex gap-2">
                  <Image
                    src={IMAGES.MENCARE}
                    alt="Men Care"
                    priority
                    className="w-6 bg-white"
                  />
                  <h2 className="text-md font-bold">Men Care</h2>
                </Link>
              </div>
            </div>

            <h2 className="text-2xl font-bold my-5 text-center">OTC Product</h2>
            <div className="border-2">
              <div className="p-2 justify-center items-center text-center">
                <Image
                  src={IMAGES.CERTIFICATE}
                  alt="Genuine Product"
                  priority
                  className="w-20 mx-auto"
                />
                <h2 className="font-bold text-sm">Genuine Product</h2>
                <div className="border-b-2"></div>
                <Image
                  src={IMAGES.MONEY}
                  alt="Best Offers and Discounts"
                  priority
                  className="w-20 mx-auto"
                />
                <h2 className="font-bold text-sm">Best Offers and Discounts</h2>
                <div className="border-b-2"></div>
                <Image
                  src={IMAGES.DELIVERY}
                  alt="Door Step Delivery"
                  priority
                  className="w-20 mx-auto"
                />
                <h2 className="font-bold text-sm">Door Step Delivery</h2>
                <div className="border-b-2"></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold my-5 text-center">Care Corner</h2>
            <div className="border-2">
              <Image
                src={IMAGES.TURMERIC}
                alt="ANTI CANCER"
                priority
                className="w-20 mx-auto"
              />
              <h3 className="text-md text-center py-2 font-bold">Turmeric</h3>
              <ul className="ps-5 list-disc text-[12px] leading-6">
                <li>
                  Turmeric contains curcumin, a compound that may have
                  anti-inflammatory, antiviral, and antibacterial properties.
                </li>
                <li>
                  It may also be beneficial for several conditions, including a
                  dry cough.
                </li>
                <li>
                  It may also be beneficial for several conditions, including a
                  dry cough
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 order-1 md:order-2">
            <div className="border-[1px] p-3 mb-4" id="description">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.DESCICON}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  MEDICAL DESCRIPTION OF {product?.product_name}
                </h1>
              </div>
              <div className="text-justify px-8 py-3">
                <div
                  className="leading-8 mt-2"
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="uses">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.USES}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="font-bold uppercase">
                  {product?.product_name} USES
                </h1>
              </div>
              <div className="text-justify px-8 py-2">
                <div
                  dangerouslySetInnerHTML={{ __html: product?.usesofmeds }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="benefits">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.BENEFITS}
                  alt="BENEFITS"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  {product?.product_name} BENEFITS
                </h1>
              </div>
              <div className="text-justify px-8 py-2">
                <div
                  className="leading-8 mt-3"
                  dangerouslySetInnerHTML={{ __html: product?.useofbenefits }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="indication">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.INDICATION}
                  alt="INDICATION"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  {product?.product_name} INDICATION
                </h1>
              </div>
              <div className="text-justify px-8 py-2">
                <div dangerouslySetInnerHTML={{ __html: product?.indicat }} />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="mechanism">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.MECHANISM}
                  alt="MECHANISM"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  MECHANISM OF ACTION OF {product?.product_name}
                </h1>
              </div>
              <div className="text-justify px-8 py-3">
                <div dangerouslySetInnerHTML={{ __html: product?.machanism }} />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="contraindication">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.MECHANISM}
                  alt="Contraindication"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  {product?.product_name} Contraindication
                </h1>
              </div>
              <div className="text-justify px-8 py-3">
                <div
                  className="leading-8"
                  dangerouslySetInnerHTML={{
                    __html: product?.contraindications,
                  }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="sideeffect">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.SIDEEFFECTS}
                  alt="SIDE EFFECTS"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  {product?.product_name} SIDE EFFECTS
                </h1>
              </div>
              <div className="text-justify px-8 py-3">
                <ul className="list-disc text-md px-5">
                  <li>
                    <div
                      className="leading-8"
                      dangerouslySetInnerHTML={{ __html: product?.sideeffects }}
                    />
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 justify-between">
                <div className="rounded-lg py-3">
                  <Image
                    src={IMAGES.SIDEEFFECT1}
                    alt="Description"
                    className="w-18 h-18 mx-auto rounded-full border-2"
                  />
                  <h3 className="text-md py-2 font-bold px-5">
                    Common Side Effect{" "}
                  </h3>
                  <div className="text-md px-5">
                    <div
                      className="leading-7 mt-2"
                      dangerouslySetInnerHTML={{
                        __html: sideeffectGeneric?.common,
                      }}
                    />
                  </div>
                </div>
                <div className="rounded-lg py-3">
                  <Image
                    src={IMAGES.SIDEEFFECT2}
                    alt="SIDE EFFECTS"
                    className="w-18 h-18 mx-auto rounded-full border-2"
                  />
                  <h3 className="text-md py-2 font-bold px-5">
                    Rare Side Effect{" "}
                  </h3>
                  <div className="text-md px-5">
                    <div
                      className="leading-7 mt-2"
                      dangerouslySetInnerHTML={{
                        __html: sideeffectGeneric?.rare,
                      }}
                    />
                  </div>
                </div>
                <div className="rounded-lg py-3">
                  <Image
                    src={IMAGES.SIDEEFFECT3}
                    alt="SIDE EFFECTS"
                    className="w-18 h-18 mx-auto rounded-full border-2"
                  />
                  <div className="justify-center items-center mx-auto">
                    <h3 className="text-md py-2 font-bold px-5">
                      Severe Side Effect{" "}
                    </h3>
                    <div className="text-md px-5">
                      <div
                        className="leading-7 mt-2"
                        dangerouslySetInnerHTML={{
                          __html: sideeffectGeneric?.severe,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-[1px] p-3 mb-4" id="faq">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.FAQS}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  FAQs FOR {product?.product_name}
                </h1>
              </div>
              <div
                className="leading-8 mt-3"
                dangerouslySetInnerHTML={{ __html: product?.faqs }}
              />
              {/* <h3 className="text-[14px] py-2 font-bold px-8">
                Can the use of a Zucet Plus Tablet cause damage to the liver?
              </h3> 
              <p className="text-justify px-8"></p>
              */}
            </div>

            <div className="border-[1px] p-3 mb-4" id="warning">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.SIDEEFFECTS}
                  alt="PRECAUTIONS AND GENERAL WARNING"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  PRECAUTIONS AND GENERAL WARNING OF {product?.product_name}{" "}
                </h1>
              </div>
              <div className="flex flex-wrap justify-between md:justify-start">
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image
                    src={IMAGES.ALCOHOL}
                    alt="ALCOHOL"
                    className="w-24 h-24 mx-auto rounded-full border-2"
                  />
                  <h3 className="text-[14px] py-1 font-bold px-5 text-center">
                    ALCOHOL
                  </h3>
                  <button className="bg-[#FFDACF] px-4 mx-auto flex m-1 rounded-md text-[#F24E1E]">
                    Caution
                  </button>
                  <div className="text-md px-5">
                    <div
                      className="leading-6 mt-3"
                      dangerouslySetInnerHTML={{ __html: product?.alcohol }}
                    />
                  </div>
                </div>
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image
                    src={IMAGES.DRIVING}
                    alt="Description"
                    className="w-24 h-24 mx-auto rounded-full border-2"
                  />
                  <h3 className="text-[14px] py-2 font-bold px-5 text-center">
                    DRIVING{" "}
                  </h3>
                  <button className="bg-[#FFDACF] px-4 mx-auto flex m-1 rounded-md text-[#F24E1E]">
                    Caution
                  </button>
                  <div className="text-md px-5">
                    <div
                      className="leading-6 mt-3"
                      dangerouslySetInnerHTML={{ __html: product?.driving }}
                    />
                  </div>
                </div>
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image
                    src={IMAGES.PREGNANCYWOMEN}
                    alt="Description"
                    className="w-24 h-24 mx-auto rounded-full border-2"
                  />
                  <div className="justify-center items-center mx-auto">
                    <h3 className="text-[14px] py-2 font-bold px-5 text-center">
                      PREGNANCY
                    </h3>
                    <button className="bg-[#E6F5F5] px-4 mx-auto flex m-1 rounded-md text-[#359494]">
                      Consult Your Doctor
                    </button>
                    <div className="text-md px-5">
                      <div
                        className="leading-6 mt-3"
                        dangerouslySetInnerHTML={{ __html: product?.pregnancy }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t-2 py-4"></div>
              <div className="flex flex-wrap md:gap-0 justify-between md:justify-start">
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image
                    src={IMAGES.BREASTFEEDING}
                    alt="BREAST FEEDING"
                    className="w-24 h-24 mx-auto rounded-full border-2"
                  />
                  <h3 className="text-[14px] py-2 font-bold px-5 text-center">
                    BREAST FEEDING
                  </h3>
                  <button className="bg-[#E6F5F5] px-4 mx-auto flex m-1 rounded-md text-[#359494]">
                    Consult Your Doctor
                  </button>
                  <div className="text-md px-5">
                    <div
                      className="leading-6 mt-3"
                      dangerouslySetInnerHTML={{
                        __html: product?.breastfeeding,
                      }}
                    />
                  </div>
                </div>
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image
                    src={IMAGES.KIDNEY1}
                    alt="KIDNEY PROBLEM"
                    className="w-24 h-24 mx-auto rounded-full border-2"
                  />
                  <h3 className="text-[14px] py-2 font-bold px-5 text-center">
                    KIDNEY PROBLEM{" "}
                  </h3>
                  <button className="bg-[#FFDACF] px-4 mx-auto flex m-1 rounded-md text-[#F24E1E]">
                    Caution
                  </button>
                  <div className="text-md px-5">
                    <div
                      className="leading-6 mt-3"
                      dangerouslySetInnerHTML={{
                        __html: product?.kidneyproblem,
                      }}
                    />
                  </div>
                </div>
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image
                    src={IMAGES.LIVER}
                    alt="Description"
                    className="w-24 h-24 mx-auto rounded-full border-2"
                  />
                  <div className="justify-center items-center mx-auto">
                    <h3 className="text-[14px] py-2 font-bold px-5 text-center">
                      LIVER DISEASE
                    </h3>
                    <button className="bg-[#E6F5F5] px-4 mx-auto flex m-1 rounded-md text-[#359494]">
                      Consult Your Doctor
                    </button>
                    <div className="text-md px-5">
                      <div
                        className="leading-7 mt-3"
                        dangerouslySetInnerHTML={{
                          __html: product?.liverdisease,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-[1px] p-3 mb-4" id="works">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.PILL}
                  alt={product?.product_name}
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  HOW TO TAKE {product?.product_name}
                </h1>
              </div>
              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-3"
                  dangerouslySetInnerHTML={{
                    __html: product?.takemedicine,
                  }}
                />
              </div>
            </div>

            <div className="border-[1px] p-3 mb-4" id="adult">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.ADULT}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  USE OF {product?.product_name} IN ADULT
                </h1>
              </div>
              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-3"
                  dangerouslySetInnerHTML={{ __html: product?.adult }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="child">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.CHILD}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  USE OF {product?.product_name} IN CHILDREN
                </h1>
              </div>
              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-3"
                  dangerouslySetInnerHTML={{ __html: product?.childrenmed }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="elder">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.PATIENT}
                  alt={product?.product_name}
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  USE OF {product?.product_name} TABLET IN ELDERLY PATIENTS
                </h1>
              </div>
              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-3"
                  dangerouslySetInnerHTML={{ __html: product?.elderlymed }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="general">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.INSTRUCTION}
                  alt="Other general warnings"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold">Other general warnings </h1>
              </div>
              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-3"
                  dangerouslySetInnerHTML={{ __html: product?.warnings }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="general">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.INSTRUCTION}
                  alt="Talk to your doctor if"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold">Talk to your doctor if</h1>
              </div>
              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-3"
                  dangerouslySetInnerHTML={{ __html: product?.talkdoctor }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="general">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.INSTRUCTION}
                  alt="general Instructions"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold">GENERAL INSTRUCTIONS</h1>
              </div>
              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-3"
                  dangerouslySetInnerHTML={{ __html: product?.instructions }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="drug">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.INTERACTION}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold uppercase">
                  DRUG INTERACTION OF {product?.product_name}
                </h1>
              </div>
              <div className="flex gap-2 py-2">
                <Image
                  src={IMAGES.DRUGINTERACTION}
                  alt="DRUG-DRUG INTERACTION"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold text-[#B7084B]">
                  DRUG-DRUG INTERACTION
                </h1>
              </div>

              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-3"
                  dangerouslySetInnerHTML={{ __html: product?.druginteraction }}
                />
                {/* <h3 className="font-bold text-sm pb-2">
                  Apalutamide + Acetaminophen
                </h3>
                <p>
                  Therapy should be administered with caution because the use of
                  apalutamide will decrease the effect of acetaminophen by
                  increasing its elimination.{" "}
                </p> */}
              </div>
              <div className="flex gap-2 py-2">
                <Image
                  src={IMAGES.DRUGFOOD}
                  alt="DRUG-FOOD"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold text-[#B7084B]">
                  DRUG-FOOD INTERACTION
                </h1>
              </div>
              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-2"
                  dangerouslySetInnerHTML={{ __html: product?.drugfood }}
                />
              </div>

              <div className="flex gap-2 py-2">
                <Image
                  src={IMAGES.DRUGDISEASE}
                  alt="DRUG-DISEASE"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold text-[#B7084B]">
                  DRUG-DISEASE INTERACTION
                </h1>
              </div>
              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-2"
                  dangerouslySetInnerHTML={{ __html: product?.drugdiease }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="overdose">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.DOSE}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold">OVER DOSE</h1>
              </div>
              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-3"
                  dangerouslySetInnerHTML={{ __html: product?.overdose }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="misseddose">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.MISSEDDOSE}
                  alt="MISSED DOSE"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold">MISSED DOSE</h1>
              </div>
              <div className="text-justify px-8">
                <div
                  className="leading-8 mt-3"
                  dangerouslySetInnerHTML={{ __html: product?.misseddose }}
                />
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="storage">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.STORAGE}
                  alt="STORAGE AND DISPOSAL"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold">STORAGE AND DISPOSAL</h1>
              </div>
              <div
                className="leading-8 mt-3"
                dangerouslySetInnerHTML={{ __html: product?.disposal }}
              />
              {/* <ul className="text-justify px-8 list-disc text-sm">
                <li>Stored at 10-30'C room temperature.</li>
                <li>Protect from light and heat.</li>
                <li>
                  Keep away from children and pets. Otherwise, it becomes toxic
                  to them.
                </li>
                <li>Disposed o properly in a suitable bag.</li>
              </ul> */}
            </div>
            <div className="border-[1px] p-3 mb-4" id="fasttag">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.FASTTAG}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold">FAST TAG</h1>
              </div>
              <div
                className="leading-8 mt-3"
                dangerouslySetInnerHTML={{ __html: product?.fasttag }}
              />
              <ul className="text-justify px-8 list-disc text-sm">
                <li>
                  Avoid consuming alcohol because it may cause excessive
                  drowsiness and stomach problems
                </li>
              </ul>
            </div>
            {/* <div className="border-[1px] p-3 mb-4" id="reference">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.REFERENCE}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold">REFERENCE</h1>
              </div>
              <p className="text-justify px-8">
                Spectrum Pharmaceuticals, Inc., US Food & Drug Administration,
                U.S. Food and Drug Administration.
              </p>
            </div> */}
            <div className="border-[1px] p-3 mb-4" id="expires">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.EXPIRED}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold">EXPIRES ON OR AFTER</h1>
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4" id="disclaimer">
              <div className="flex gap-2">
                <Image
                  src={IMAGES.DISCLAIMER}
                  alt="Description"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-md font-bold">PRODUCT DISCLAIMER</h1>
              </div>
              <p className="text-justify px-8 leading-8 mt-3">
                A Product {product?.product_name} Tablet will be supplied by the
                licensed vendor partner in your nearest delivery location.{" "}
                <br />
                On accepting the order , the details of licensed vendor partner
                details will share with you before the supply of your order.
                <br />
                Orders acceptances depends on the availability of the medicine
                and with valid prescription from the registered medical
                practitioner (Doctor).
              </p>
            </div>
            <div className="bg-[#D8EECA] rounded-md p-2 px-6">
              <h1 className="font-bold text-md">DRUGS FACT BOX</h1>
              <div className="flex bg-white p-2 my-2 rounded-md text-sm">
                <h2 className="text-gray-300 w-1/2">Chemical Class</h2>
                <h2 className="w-1/2">Sulfinylbenzimidazale Derivate</h2>
              </div>
              <div className="flex bg-white p-2 my-2 rounded-md text-sm">
                <h2 className="text-gray-300 w-1/2">Habit Forming</h2>
                <h2 className="w-1/2">No</h2>
              </div>
              <div className="flex bg-white p-2 my-2 rounded-md text-sm">
                <h2 className="text-gray-300 w-1/2">Therapeutic Class</h2>
                <h2 className="w-1/2">Gastor Intestinal</h2>
              </div>
              <div className="flex bg-white p-2 my-2 rounded-md text-sm">
                <h2 className="text-gray-300 w-1/2">Action Class</h2>
                <h2 className="w-1/2">Proton pump inhibitors</h2>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 col-span-6 order-3 md:order-3">
            <div className="">
              <h2 className="font-bold text-center m-2 text-xl">
                Generic Name
              </h2>
              <div className="bg-[#F3F8FC] text-md text-center border-[1.5px] m-2 rounded">
                <Image
                  src={IMAGES.NO_IMAGE}
                  alt={product?.genericname}
                  className="w-20 mx-auto"
                />
                <h2 className="font-bold pb-3">{product?.genericname}</h2>
              </div>
              <h2 className="font-bold text-center m-2 text-xl">
                Alternate Brands
              </h2>
              <div className="bg-[#F3F8FC] text-[14px] border-[1.5px] m-2 rounded">
                {alterBrands?.map((product, i) => (
                  <div key={i}>
                    <div className="flex m-3">
                      <div className="w-2/3">
                        <h2 className="text-lg">{product?.product_name}</h2>
                        <div className="flex text-[10px] gap-3 font-semibold">
                          <p className="capitalize">{product?.cat_name}</p>
                          {product?.rexrequired > 0 ? (
                            <p>{product?.rexrequired}</p>
                          ) : null}
                        </div>
                        <h3 className="text-[#B7084B] font-bold text-lg">
                          &#8377; {product?.saleprice}
                        </h3>
                        <h3 className="text-[#35A24D] font-semibold">
                          Get this at &#8377; {product?.price}
                        </h3>
                      </div>
                      <div className="w-1/3">
                        <Image
                          src={
                            product?.product_img
                              ? `https://assets2.drugcarts.com/${product?.product_img}`
                              : IMAGES.NO_IMAGE
                          }
                          alt={product?.product_name}
                          width={96}
                          height={96}
                          className="w-[96px] h-[90px] mx-auto"
                        />
                      </div>
                    </div>
                    <div className="border-[1px] m-3"></div>
                  </div>
                ))}
                {/* <Link
                  href="#"
                  className="justify-center flex text-blue-500 font-bold py-3"
                >
                  View All
                </Link> */}
              </div>
              <div className="border-2 my-4 m-3 rounded-md">
                <div className="flex p-3 justify-between items-center text-lg ps-10">
                  <h3 className="font-bold">
                    {onAuth.length} Items <br />{" "}
                    <span className="text-gray-300 text-sm font-semibold">
                      in your cart
                    </span>
                  </h3>
                  <Image
                    src={IMAGES.MEDICINE}
                    alt="Description"
                    className="w-20 h-20 mx-auto"
                  />
                </div>
                <button
                  className="bg-[#B7084B] flex mx-auto p-1 m-2 text-white rounded-md px-3"
                  onClick={checkoutClick}
                >
                  View Cart
                </button>
              </div>
              <div className="border-2 my-4 m-3 rounded-md">
                <div className="flex p-3 justify-between items-center text-lg">
                  <div className="leading-5">
                    <p className="text-sm text-gray-400">Save Your Time</p>
                    <h2 className="my-3 font-bold">Order Quickly</h2>
                    <p className="text-[14px]">
                      Upload doctor's prescription
                      <br /> and we will add the medicine
                      <br /> for you
                    </p>
                  </div>
                  <div>
                    <Image
                      src={IMAGES.PRESCRIPTION}
                      alt="Description"
                      className="w-32 mx-auto"
                    />
                  </div>
                </div>
                <button
                  className="bg-[#35A24D] flex mx-auto p-1 m-2 text-white rounded-md px-12"
                  onClick={uploadClick}
                >
                  Upload
                </button>
                <ul className="list-disc text-[14px] ml-8 py-3">
                  <li>Standard Delivery in 3 - 5 day(s)</li>
                  <li>
                    Actual delivery time may vary depending on other items in
                    your order
                  </li>
                </ul>
              </div>
              <div className="border-2 border-gray-300 p-4 rounded-md">
                <h2 className="font-bold text-center m-2 text-xl">
                  Related Lab Test <br />
                  To The Product
                </h2>
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md mb-5">
                  <Image
                    src={IMAGES.DIABETESLABTEST}
                    alt="ANTI CANCER"
                    priority
                    className="w-16 bg-white mx-4"
                  />
                  <h2 className="text-md font-bold">Diabetes</h2>
                </div>
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md mb-5">
                  <Image
                    src={IMAGES.HEMOGRAMLABTEST}
                    alt="ANTI CANCER"
                    priority
                    className="w-16 bg-white mx-4"
                  />
                  <h2 className="text-md font-bold">Complete Hemogram</h2>
                </div>
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md mb-5">
                  <Image
                    src={IMAGES.THYROIDLABTEST}
                    alt="ANTI CANCER"
                    priority
                    className="w-16 bg-white mx-4"
                  />
                  <h2 className="text-md font-bold">Thyroid Test</h2>
                </div>
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md mb-5">
                  <Image
                    src={IMAGES.LIPIDLABTEST}
                    alt="ANTI CANCER"
                    priority
                    className="w-16 bg-white mx-4"
                  />
                  <h2 className="text-md font-bold">Lipid Profile</h2>
                </div>
              </div>

              <QuestionCard />
              <h2 className="font-bold text-center m-2 text-xl">
                Medicine Related Indication
              </h2>
              <div className="bg-[#F4FFFF] p-4 border-2">
                <div className="flex items-center gap-2 border-b-2 border-gray-300 py-5">
                  <Image
                    src={IMAGES.PAINRELIFER}
                    alt="ANTI CANCER"
                    priority
                    className="w-28 bg-white mx-4 border-2 rounded-md"
                  />
                  <h2>Pain Reliver</h2>
                </div>
                <div className="flex items-center gap-2 p-2 border-b-2 border-gray-300 py-5">
                  <Image
                    src={IMAGES.ALLERGIC}
                    alt="ANTI CANCER"
                    priority
                    className="w-28 bg-white mx-4 border-2 rounded-md"
                  />
                  <h2>Allergic Condition</h2>
                </div>
                <div className="flex items-center gap-2 p-2 border-b-2 border-gray-300 py-5">
                  <Image
                    src={IMAGES.FEVER}
                    alt="ANTI CANCER"
                    priority
                    className="w-28 bg-white mx-4 border-2 rounded-md"
                  />
                  <h2>Fever</h2>
                </div>
              </div>
              <h2 className="font-bold text-center m-2 text-xl">
                Frequently bought Together
              </h2>
              <div className="grid grid-cols-2 gap-2 justify-center items-center mx-auto ">
                <div className="border-2">
                  <div className="bg-pink-200 m-3 rounded-md">
                    <span className="bg-[#B7084B] mx-1 text-[10px] text-white p-[0.5px]">
                      -10%
                    </span>
                    <Image
                      src={IMAGES.NO_IMAGE}
                      alt="ANTI CANCER"
                      priority
                      className="w-24 mx-auto py-2 rounded-md"
                    />
                  </div>
                  <p className="text-gray-400 text-[12px] px-2">Cold Cough</p>
                  <h3 className="text-[12px] px-2 font-bold">
                    Emcof Herbal (pack of 2)
                  </h3>
                  <h2 className="text-[12px] px-2 font-bold">Rs. 299.00</h2>
                  <div className="flex justify-between gap-4 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-[#B7084B]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="border-2">
                  <div className="bg-pink-200 m-3 rounded-md">
                    <span className="bg-[#B7084B] mx-1 text-[10px] text-white p-[0.5px]">
                      -10%
                    </span>
                    <Image
                      src={IMAGES.NO_IMAGE}
                      alt="ANTI CANCER"
                      priority
                      className="w-24 mx-auto py-2 rounded-md"
                    />
                  </div>
                  <p className="text-gray-400 text-[12px] px-2">Cold Cough</p>
                  <h3 className="text-[12px] px-2 font-bold">
                    Emcof Herbal (pack of 2)
                  </h3>
                  <h2 className="text-[12px] px-2 font-bold">Rs. 299.00</h2>
                  <div className="flex justify-between gap-4 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-[#B7084B]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <h2 className="font-bold text-center m-2 text-xl">
                Tranding Product
              </h2>
              <div className="grid grid-cols-2 gap-2 justify-center items-center mx-auto ">
                <div className="border-2">
                  <div className="bg-green-200 m-3 rounded-md">
                    <span className="bg-[#B7084B] mx-1 text-[10px] text-white p-[0.5px]">
                      -10%
                    </span>
                    <Image
                      src={IMAGES.NO_IMAGE}
                      alt="ANTI CANCER"
                      priority
                      className="w-24 mx-auto py-2 rounded-md"
                    />
                  </div>
                  <p className="text-gray-400 text-[12px] px-2">Cold Cough</p>
                  <h3 className="text-[12px] px-2 font-bold">
                    Emcof Herbal (pack of 2)
                  </h3>
                  <h2 className="text-[12px] px-2 font-bold">Rs. 299.00</h2>
                  <div className="flex justify-between gap-4 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-[#B7084B]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="border-2">
                  <div className="bg-pink-200 m-3 rounded-md">
                    <span className="bg-[#B7084B] mx-1 text-[10px] text-white p-[0.5px]">
                      -10%
                    </span>
                    <Image
                      src={IMAGES.NO_IMAGE}
                      alt="ANTI CANCER"
                      priority
                      className="w-24 mx-auto py-2 rounded-md"
                    />
                  </div>
                  <p className="text-gray-400 text-[12px] px-2">Cold Cough</p>
                  <h3 className="text-[12px] px-2 font-bold">
                    Emcof Herbal (pack of 2)
                  </h3>
                  <h2 className="text-[12px] px-2 font-bold">Rs. 299.00</h2>
                  <div className="flex justify-between gap-4 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-[#B7084B]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-5 border-2 my-10">
                <h2 className="font-bold text-center m-2 text-xl">
                  WE WILL HELP YOU?
                </h2>
                <div className="flex items-center gap-5">
                  <Image src={IMAGES.HELP} className="w-24" alt="Help" />
                  <ul className="list-disc text-sm">
                    <li>A Guide to Drugcarts</li>
                    <li>Prescription Guide</li>
                    <li>Policy</li>
                  </ul>
                </div>
              </div>
              <h2 className="font-bold text-center m-2 text-2xl">
                Our Categories
              </h2>
              <RightAyushCategory />

              <h2 className="font-bold text-center m-2 text-2xl my-8">
                Our Care
              </h2>
              <RightOurCare />

              <h2 className="font-bold text-center m-2 text-2xl my-8">
                Health Store Availability
              </h2>
              <RightHealthStore />

              <RightOurService />

              <h2 className="font-bold text-center m-2 text-2xl my-8">
                Our Home Service
              </h2>
              <OurHomeService />
              <OurTreatment />
            </div>
          </div>
        </div>
      </section>
    </>
    // <div>
    //   <h2>ProductDetails: {productData?.cat_name}</h2>
    //   <p>{productData?.url}</p>
    //   <p>{productData?.generices}</p>

    //   {alterBrands?.products?.map((product, i) => (
    //     <div key={i}>
    //       <h2 className="text-lg">
    //         {product?.product_name} ({product?.generices})
    //       </h2>
    //     </div>
    //   ))}

    //   <p>{subCateUrl?.subcat_name}</p>
    //   <p>{storageid?.storagename}</p>
    //   <p>{packid?.packagename}</p>
    //   <p>{manufactuerurl?.manufactuername}</p>
    //   <p>{sideeffectGeneric?.common}</p>

    //   {cartDetails?.[0]?.quantity && (
    //     <p>Quantity in Cart: {cartDetails[0].quantity}</p>
    //   )}
    // </div>
  );
};

export default ProductDetails;
