"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import { IMAGES } from "@/components/common/images";

export default function MedicineClient({
  pageBannerUrl,
  categoryData,
  pagination,
  firstLetter: initialLetter,
  pageNo: initialPage,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedLetter, setSelectedLetter] = useState(initialLetter);
  const [currentPage, setCurrentPage] = useState(Number(initialPage) || 1);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Sync state with URL params whenever they change (including browser back/forward)
  useEffect(() => {
    const letterParam = searchParams.get("letter") || initialLetter || "A";
    const pageParam = parseInt(searchParams.get("page") || initialPage || "1", 10);

    if (letterParam !== selectedLetter) setSelectedLetter(letterParam);
    if (pageParam !== currentPage) setCurrentPage(pageParam);
  }, [searchParams, initialLetter, initialPage]);

  const handleLetterClick = (letter) => {
    router.push(`/medicine?letter=${letter}&page=1`, { scroll: false });
  };

  const handlePageChange = (_, value) => {
    router.push(`/medicine?letter=${selectedLetter}&page=${value}`, { scroll: false });
  };

  const handleCategoryClick = (url) => {
    router.push(`/catalog/${url}`);
  };

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
        className={`mb-3 mx-auto object-cover ${categories.cat_img ? "bg-bgcancer" : "bg-white"
          } rounded-full p-2`}
        onError={handleError}
      />
    );
  };
  return (
    <section className="max-w-7xl mx-auto py-8">
      <Image
        priority
        src={
          pageBannerUrl?.image
            ? `https://assets1.drugcarts.com/admincolor/homepage/pagebanner/${pageBannerUrl.image}`
            : IMAGES.NO_IMAGE
        }
        alt="Ayush Banner"
        className="w-full h-[200px] rounded-xl"
        width={1200}
        height={200}
      />

      <div className="py-4 text-xl font-bold text-center">A - Z Order Medicine</div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`${selectedLetter === letter ? "bg-[#B7084B]" : "bg-[#35A24D]"
              } px-3 py-1 text-white rounded-md`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
        <button
          className={`${selectedLetter === "" ? "bg-[#B7084B]" : "bg-[#35A24D]"
            } px-3 py-1 text-white rounded-md`}
          onClick={() => handleLetterClick("")}
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pb-20 px-2 md:px-0">
        {categoryData.map((category, i) => (
          <div
            key={i}
            className="bg-bgshop rounded-lg p-4 cursor-pointer"
            onClick={() => handleCategoryClick(category.url)}
          >
            <p className="text-center">
              {/* <Image
                width={100}
                height={100}
                src={
                  category.cat_img
                    ? `https://assets2.drugcarts.com/category/thumb/${category.cat_img}`
                    : IMAGES.NO_IMAGE
                }
                alt={category.category_name}
                className={`mb-3 mx-auto object-cover ${category.cat_img ? "bg-bgcancer" : "bg-white"
                  } rounded-full p-2`}
              /> */}
              <CategoryImage
                categories={category}
              />
              <span className="capitalize">{category.category_name}</span>
            </p>
          </div>
        ))}
      </div>

      <Box
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontFamily={"Poppins"}>
          Showing 1–10 of {pagination.totalItems || 0} entries
        </Typography>
        <Pagination
          size="large"
          count={pagination.totalPages || 1}
          page={currentPage}
          color="secondary"
          onChange={handlePageChange}
        />
      </Box>
    </section>
  );
}
