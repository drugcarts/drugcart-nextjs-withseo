"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IMAGES } from "../common/images";
import Image from "next/image";

const TopCategoryClient = ({ categories }) => {
  const router = useRouter();

  // const CategoryImage = ({ cat_img, category_name }) => {
  //   const newUrl = `https://drugcarts-nextjs.s3.ap-south-1.amazonaws.com/category/thumb/${cat_img}`;
  //   const oldUrl = `https://assets2.drugcarts.com/category/thumb/${cat_img}`;
  //   const noImage = "./noimage.png";

  //   const [src, setSrc] = useState(newUrl);

  //   const handleError = () => {
  //     if (src !== oldUrl) {
  //       setSrc(oldUrl); // Fallback to old image
  //     } else {
  //       setSrc(noImage);
  //     }
  //   };

  //   return (
  //     <img
  //       src={src}
  //       onError={handleError}
  //       width={100}
  //       height={100}
  //       alt={category_name}
  //       className="mb-3 mx-auto object-cover bg-bgcancer rounded-full p-2 w-24 h-24"
  //     />
  //   );
  // };

  const CategoryImage = ({ categories }) => {
    const primaryImage = categories?.cat_img
      ? `https://assets2.drugcarts.com/category/thumb/${categories.cat_img}`
      : null;

    const fallbackImage = categories?.cat_img
      ? `https://drugcarts-nextjs.s3.ap-south-1.amazonaws.com/category/thumb/${categories.cat_img}`
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
        alt={categories?.category_name || "Category Image"}
        width={100}
        height={100}
        className="mb-3 mx-auto object-cover bg-bgcancer rounded-full p-2 w-24 h-24"
        onError={handleError}
      />
    );
  };

  return (
    <>
      {categories?.map((category, i) => {
        return (
          <div
            className="bg-bgshop rounded-lg p-4 cursor-pointer"
            key={i}
            onClick={() => router.push(`/catalog/${category?.url}`)}
          >
            <p className="text-center">
              <CategoryImage
                categories={category}
              />
              <span>{category?.category_name}</span>
            </p>
          </div>
        );
      })}
    </>
  );
};

export default TopCategoryClient;
