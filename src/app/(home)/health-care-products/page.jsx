import { notFound } from "next/navigation";
import CategoryClient from "./CategoryClient";
import { GetCategoryService } from "@/services/home/productsService";

export default async function ProductPage() {
  const page = 1;
  const showNo = 20;
  const search = "";
  const product = await GetCategoryService(page, showNo, "treatments", search);

  if (!product || !product.catproducts || product.catproducts.length === 0) {
    return notFound();
  }

  return (
    <>
      <CategoryClient productData={product?.catproducts} />
    </>
  );
}
