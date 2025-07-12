"use client"
import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "./images";

function CategoryCard({ imagUrl, imageAlt, title, onClick }) {

  const CategoryImage = ({ category_name, cat_img }) => {
    const primaryImage = cat_img
      ? `https://assets2.drugcarts.com/category/thumb/${cat_img}`
      : null;

    const fallbackImage = cat_img
      ? `https://drugcarts-nextjs.s3.ap-south-1.amazonaws.com/category/thumb/${cat_img}`
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
        alt={category_name || "Category Image"}
        width={100}
        height={100}
        className={`mb-3 mx-auto w-24 h-24 object-cover ${cat_img ? "bg-bgcancer" : "bg-white"
          } rounded-full p-2`}
        onError={handleError}
      />
    );
  };

  return (
    <div className="bg-bgshop rounded-lg p-4 cursor-pointer" onClick={onClick}>
      <p className="text-center">
        <CategoryImage cat_img={imagUrl} category_name={imageAlt}/>
        <span>{title}</span>
      </p>
    </div>
  );
}

export default CategoryCard;
