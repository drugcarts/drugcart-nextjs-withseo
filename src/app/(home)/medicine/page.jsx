import {
  getCategoryData,
  getMedicineBannerData,
} from "@/services/home/categoryService";
import MedicineClient from "./MedicineClient";
import { getMetatags } from "@/lib/getMetatags";

export default async function Medicine({ searchParams }) {
  const { letter, page } = await searchParams || {};
    const firstLetter = (letter || "A").toUpperCase();
  const [medicineBanner, data] = await Promise.all([
    getMedicineBannerData("medicine"),
    getCategoryData(firstLetter, page || 1),
  ]);

  return (
    <MedicineClient
      pageBannerUrl={medicineBanner}
      pageNo={page || 1}
      firstLetter={firstLetter}
      categoryData={data?.categories || []}
      pagination={data?.pagination || {}}
    />
  );
}

// Metadata for SEO
export async function generateMetadata() {
  const slug = "medicine";

  try {
    const post = await getMetatags(slug);

    return {
      title:
        post.metatitle || "Drugcarts - Best medicines online | Drugcarts.com",
      description:
        post.metadesc || "Buy medicine & healthcare products online at Drugcarts.",
      keywords: post.metakeyword || "medicine, health, drugcarts",
      metadataBase: new URL("https://drugcarts.com/medicine"),
      alternates: {
        canonical: "https://drugcarts.com/medicine",
        languages: {
          en: "https://drugcarts.com/medicine",
        },
      },
      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: "https://drugcarts.com/medicine",
        images: [
          {
            url:
              post.image ||
              "https://assets2.drugcarts.com/static/image/logodrugnew.jpg",
            width: 1200,
            height: 630,
            alt: post.metatitle || "DrugCarts About Us",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
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
    return {
      title: "Drugcarts - Best medicines online | Drugcarts.com",
      description: "Page failed to load.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}
