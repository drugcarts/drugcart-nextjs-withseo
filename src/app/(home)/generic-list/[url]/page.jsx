// app/generic-list/[url]/page.js
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/components/common/images";
import { GetProductsUrlService } from "@/services/home/productsService";
import ClientFilterPanel from "./ClientFilterPanel";
import ClientCartButton from "./ClientCartButton";
import { GetGenericListMeta } from "@/services/metatags/genericListMeta";

export async function generateMetadata({ params }) {
  const { url } = await params;
  try {
    const post = await GetGenericListMeta(url);
    return {
      title:
        post.metatitle ||
        "Drugcarts - Find best medicines and healthcare products online|Drugcarts.com",
      description:
        post.metadesc ||
        "Learn about DrugCarts – India’s trusted digital health platform for pharmacy, diagnostics, and homecare services.",
      keywords:
        post.metakeyword ||
        "online pharmacy, DrugCarts, health care, diagnostics, homecare",

      metadataBase: new URL(`https://drugcarts.com/generic-list/${post.url}`),
      alternates: {
        canonical: `https://drugcarts.com/generic-list/${post.url}`,
        languages: {
          en: `https://drugcarts.com/generic-list/${post.url}`,
        },
      },

      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: `https://drugcarts.com/generic-list/${post.url}`, // adjust if needed
        images: "https://assets2.drugcarts.com/static/image/logodrugnew.jpg",
        type: "website",
      },

      twitter: {
        card: "https://assets2.drugcarts.com/static/image/logodrugnew.jpg",
        site: "@Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        images: ["https://assets2.drugcarts.com/static/image/logodrugnew.jpg"],
      },

      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        },
      },
      verification: {
        google: "rWRgYI7x0MJUjaWvpsrL7Kuppa-ePcjcEOO7DF0UU6U",
        yandex: "35e97e71746205ab",
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);

    return {
      title:
        "Drugcarts - Find best medicines and healthcare products online|Drugcarts.com",
      description:
        "Learn about DrugCarts – India’s trusted digital health platform for pharmacy, diagnostics, and homecare services.",
      robots: { index: false, follow: false },
    };
  }
}

const GenericProductListPage = async ({ params }) => {
  const { url } = await params;
  const page = 1;
  const showNo = 10;
  const search = "";
  const productList = await GetProductsUrlService(page, showNo, search, url);

  return (
    <section className="max-w-7xl mx-auto ">
      <div className="py-2 text-xl font-bold">
        <h2 className="ml-2">List of Medicine</h2>
      </div>
      <div className="flex flex-wrap">
        <div className="w-[20%] flex-none hidden md:block">
          <ClientFilterPanel productData={productList} />
        </div>
        <div className="w-full md:w-[80%] flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-3 content-center place-items-center">
            {productList?.products?.map((product, i) => (
              <div
                key={i}
                className="relative border rounded-lg p-2 bg-white shadow hover:shadow-lg w-5/6 md:w-full mt-2 md:mt-0 "
              >
                <div className="grid justify-end">
                  {product?.percentage && (
                    <div className="ml-20 bg-[#ff5c01] text-white text-xs px-2 py-1 rounded-full">
                      -{product.percentage}%
                    </div>
                  )}
                </div>
                <Image
                  src={
                    product?.product_img
                      ? `https://assets2.drugcarts.com/${product?.product_img}`
                      : IMAGES.NO_IMAGE
                  }
                  alt={product?.product_name}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenericProductListPage;
