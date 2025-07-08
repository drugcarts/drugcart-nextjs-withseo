"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";

export default function MedicineClient({
  pageBannerUrl,
  categoryData,
  pagination,
  firstLetter: initialLetter,
  pageNo: initialPage,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getLetterParam = searchParams.get("letter");
  const [selectedLetter, setSelectedLetter] = useState(getLetterParam);
  const [currentPage, setCurrentPage] = useState(Number(initialPage) || 1);
  const [categories, setCategories] = useState(categoryData || []); // For storing the fetched categories
  const [totalItems, setTotalItems] = useState(pagination.totalItems || 0); // Total items count
  const [totalPages, setTotalPages] = useState(pagination.totalPages || 1); // Total pages count
  const [limit, setLimit] = useState(12); // Set limit per page, adjust as needed

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    router.replace(`/medicine?letter=A&page=1`)
  },[])
  // Sync state with URL params whenever they change (including browser back/forward)
  useEffect(() => {
    const letterParam = searchParams.get("letter");
    const pageParam = parseInt(searchParams.get("page") || "1", 10);

    // Only update the state if the params change
    if (letterParam !== selectedLetter) setSelectedLetter(letterParam);
    if (pageParam !== currentPage) setCurrentPage(pageParam);
  }, [searchParams]); // Only depend on `searchParams` for updates

  // Fetch category data whenever the selected letter, page, or limit changes
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const letterParam = selectedLetter || ""; // "" for "View All"
        const res = await fetch(
          `/api/category/first-letter?search=${letterParam}&page=${currentPage}&limit=${limit}&cat_type=prescriptions`
        );
        const data = await res.json();
        if (data) {
          setCategories(data.categories || []);
          setTotalItems(data.pagination?.totalItems || 0);
          setTotalPages(data.pagination?.totalPages || 1);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [selectedLetter, currentPage, limit]);

  // Handle letter button click
  const handleLetterClick = (letter) => {
    setSelectedLetter(letter); // Update the selected letter
    setCurrentPage(1); // Reset to the first page when a new letter is selected
    router.push(`/medicine?letter=${letter}&page=1`, { scroll: false });
  };

  // Handle page change
  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    router.push(`/medicine?letter=${selectedLetter || ""}&page=${value}`, { scroll: false });
  };

  // Handle View All button click
  const handleViewAllClick = () => {
    // Reset the letter and page to show all categories
    setSelectedLetter(""); // Empty string to show all categories
    setCurrentPage(1); // Reset to page 1
    router.push(`/medicine?letter=&page=1`, { scroll: false }); // Update URL with empty letter and page 1
  };

  // Handle category click
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
        src={pageBannerUrl?.image
          ? `https://assets1.drugcarts.com/admincolor/homepage/pagebanner/${pageBannerUrl.image}`
          : IMAGES.NO_IMAGE}
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
            className={`${selectedLetter === letter ? "bg-[#B7084B]" : "bg-[#35A24D]"} px-3 py-1 text-white rounded-md`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
        <button
          className={`${selectedLetter === "" ? "bg-[#B7084B]" : "bg-[#35A24D]"} px-3 py-1 text-white rounded-md`}
          onClick={handleViewAllClick} // View All logic
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pb-20 px-2 md:px-0">
        {categories.map((category, i) => (
          <div
            key={i}
            className="bg-bgshop rounded-lg p-4 cursor-pointer"
            onClick={() => handleCategoryClick(category.url)}
          >
            <CategoryImage categories={category} />
            <p className="capitalize text-center">{category.category_name}</p>
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
          Showing {((currentPage - 1) * limit) + 1}–{Math.min(currentPage * limit, totalItems)} of {totalItems || 0} entries
        </Typography>
        <Pagination
          size="large"
          count={totalPages || 1}
          page={currentPage}
          color="secondary"
          onChange={handlePageChange}
        />
      </Box>
    </section>
  );
}
