"use client";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { GetCategoryService } from "@/services/categoryService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TopCategory = () => {
  const { categories } = useSelector((state) => state.categoryData);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(GetCategoryService(1, 8));
  }, [dispatch]);

  return (
    <>
      {categories?.categories?.map((category, i) => {

        return (
          <div
            className="bg-bgshop rounded-lg p-4 cursor-pointer"
            key={i}
            onClick={() => router.push(`/catalog/${category?.url}`)}
          >
            <p className="text-center">
              <img
                width={100}
                height={100}
                src={`https://drugcarts-nextjs.s3.ap-south-1.amazonaws.com/category/thumb/${category?.cat_img}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://assets2.drugcarts.com/category/thumb/${category?.cat_img}`;
                }}
                alt={category?.category_name}
                className="mb-3 mx-auto object-cover bg-bgcancer rounded-full p-2 w-24 h-24"
              />
              <span>{category?.category_name}</span>
            </p>
          </div>
        );
      })}
    </>
  );
};

export default TopCategory;
