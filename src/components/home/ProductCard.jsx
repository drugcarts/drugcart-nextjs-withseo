"use client"
import Image from "next/image";
import { IMAGES } from "../common/images";
import { useState } from "react";
import Link from "next/link";
import ClientCartButton from "@/app/(home)/generic-list/[url]/ClientCartButton";

export default function ProductCard({ product }) {
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
        <div
            className="relative border rounded-lg p-2 bg-white shadow hover:shadow-lg w-5/6 md:w-full mt-2 md:mt-0 "
        >
            <div className="grid justify-end">
                {product?.percentage && (
                    <div className="ml-20 bg-[#ff5c01] text-white text-xs px-2 py-1 rounded-full">
                        -{product.percentage}%
                    </div>
                )}
            </div>
            <ProductImage
                product={product}
                width={250}
                height={220}
                className="sml-3 p-2 w-[250px] h-[220px] my-1 mx-auto pt-6"
            />
            <h3 className="text-gray-500 text-[13px] w-[60%] line-clamp-1 capitalize">
                {product?.cat_name} / {product?.generices}
            </h3>
            <h2 className="text-black font-bold text-[13px] mt-1 w-[80%] line-clamp-1">
                <Link href={`/product/${product.url}`} prefetch={false}>
                    {product?.product_name}
                </Link>
            </h2>
            <div className="flex items-center space-x-4 mt-1">
                <h3 className="line-through text-gray-500 text-sm">
                    MRP : ₹{product?.price}
                </h3>
                <h3 className="text-green-600 text-sm font-semibold">
                    {product?.percentage} %
                </h3>
            </div>
            <div className="flex justify-between mt-1">
                <p className="text-black font-semibold text-[14px]">
                    ₹ {product?.saleprice}
                </p>
                <ClientCartButton product={product} />
            </div>
            <div className="flex items-center mt-2">
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-gray-500">&#9733;</span>
            </div>
        </div>
    );
}
