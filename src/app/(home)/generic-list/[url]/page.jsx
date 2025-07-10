// app/generic-list/[url]/page.js
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/components/common/images";
import { GetProductsUrlService } from "@/services/home/productsService";
import ClientFilterPanel from "./ClientFilterPanel";
import ClientCartButton from "./ClientCartButton";
import { GetGenericListMeta } from "@/services/metatags/genericListMeta";
import ProductCard from "../../../../components/home/ProductCard";

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
      <ClientFilterPanel productData={productList} />
      <div className="w-full md:w-[80%] flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-3 content-center place-items-center">
          {productList?.products?.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenericProductListPage;
