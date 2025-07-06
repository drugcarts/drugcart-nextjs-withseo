// app/generic-list/[url]/ClientFilterPanel.jsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import Helpful from "@/components/ProductDetailsCard/Helpful";
import OtcProduct from "@/components/productinfo/OtcProduct";
import FilterCompanyCard from "@/components/productinfo/FilterCompanyCard";
import { tableText } from "@/utils/textFormat";

const ClientFilterPanel = ({ productData }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 500);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 500);
    setMaxPrice(value);
  };

  const ProductClick = (url) => {
    router.push(`/product/${url}`);
  };

  // useEffect(() => {
  //   if (minPrice > maxPrice - 500) {
  //     setMinPrice(maxPrice - 500);
  //   }
  //   if (maxPrice < minPrice + 500) {
  //     setMaxPrice(minPrice + 500);
  //   }
  // }, [minPrice, maxPrice]);

  return (
    <>
      <section
        aria-labelledby="latest-product-heading"
        className="border-[1.5px] rounded-md"
      >
        <header>
          <h2
            id="latest-product-heading"
            className="bg-[#B7084B] p-2 text-white font-bold text-center"
          >
            Latest Product
          </h2>
        </header>

        <article className="m-2" role="group" aria-label="Featured product">
          <div className="flex justify-start border-[1.5px] p-2">
            <Image
              src={
                productData?.products?.[0]?.product_img
                  ? `https://assets2.drugcarts.com/${productData?.products?.[0]?.product_img}`
                  : IMAGES.NO_IMAGE
              }
              alt={
                productData?.products?.[0]?.product_name
                  ? productData.products[0].product_name
                  : "Product image not available"
              }
              width={250}
              height={220}
              className="w-16 h-16 object-cover"
            />
            <div className="ml-2">
              <h3
                className="font-bold text-sm cursor-pointer"
                onClick={() => ProductClick(productData?.products?.[0]?.url)}
              >
                {tableText(productData?.products?.[0]?.product_name, 30)}
              </h3>
              <p className="text-gray-400 text-xs">
                {productData?.products?.[0]?.generices}
              </p>
              <div
                className="flex items-center mt-2"
                aria-label="Product rating: 4 out of 5 stars"
              >
                {[1, 2, 3, 4].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xs">
                    &#9733;
                  </span>
                ))}
                <span className="text-gray-500 text-xs">&#9733;</span>
              </div>
              <p className="text-bgcolor text-sm font-semibold">
                Banned for sale
              </p>
            </div>
          </div>
        </article>
      </section>

      <section
      aria-labelledby="price-range-heading"
      className="border-[1.5px] mt-5 rounded-md"
    >
      <header>
        <h2
          id="price-range-heading"
          className="bg-[#4C4C95] p-2 text-white font-bold text-center"
        >
          Price Range
        </h2>
      </header>

      <div
        className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-4"
        role="group"
        aria-label="Price filter range"
      >
        {/* Range Slider */}
        <div className="relative my-6">
          <div className="w-full h-1 bg-gray-300 rounded-lg absolute top-1/2 transform -translate-y-1/2" />

          <input
            type="range"
            min="0"
            max="10000"
            value={minPrice}
            onChange={handleMinChange}
            className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto"
            aria-label="Minimum price"
          />

          <input
            type="range"
            min="0"
            max="10000"
            value={maxPrice}
            onChange={handleMaxChange}
            className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto"
            aria-label="Maximum price"
          />

          <div className="absolute left-0 -top-6 bg-indigo-700 text-white text-xs px-2 py-1 rounded-md">
            ₹{minPrice}
          </div>
          <div className="absolute right-0 -top-6 bg-indigo-700 text-white text-xs px-2 py-1 rounded-md">
            ₹{maxPrice >= 10000 ? "10k" : maxPrice}
          </div>
        </div>

        {/* Numeric Inputs */}
        <div className="flex justify-center items-center space-x-4 py-6">
          <label htmlFor="min-price" className="sr-only">
            Minimum price
          </label>
          <input
            id="min-price"
            type="number"
            min="0"
            max="10000"
            value={minPrice}
            onChange={handleMinChange}
            className="w-24 p-2 border rounded-lg text-center"
          />
          <span className="text-lg font-bold">-</span>
          <label htmlFor="max-price" className="sr-only">
            Maximum price
          </label>
          <input
            id="max-price"
            type="number"
            min="0"
            max="10000"
            value={maxPrice}
            onChange={handleMaxChange}
            className="w-24 p-2 border rounded-lg text-center"
          />
        </div>
      </div>
    </section>
      <FilterCompanyCard />
      <Helpful />
      <OtcProduct />
    </>
  );
};

export default ClientFilterPanel;
