import ServiceClinet from "./ServiceClinet";
import { getMetatags } from "@/lib/getMetatags";
import { GetDrugService } from "@/services/home/drugService";

export const dynamic = "force-dynamic"; 
export default async function Services({ searchParams }) {
  const page = parseInt(searchParams?.page || "1", 10);
  const showNo = 12;
  const data = await GetDrugService(page, showNo)

  return (
    <ServiceClinet
      pageNo={page}
      serviceData={data?.services || []}
      pagination={data?.pagination || {}}
    />
  );
}

// Metadata for SEO
export async function generateMetadata() {
  const slug = "services";

  try {
    const post = await getMetatags(slug);

    return {
      title:
        post.metatitle || "Drugcarts - Best medicines online | Drugcarts.com",
      description:
        post.metadesc || "Buy medicine & healthcare products online at Drugcarts.",
      keywords: post.metakeyword || "medicine, health, drugcarts",
      metadataBase: new URL("https://drugcarts.com/services"),
      alternates: {
        canonical: "https://drugcarts.com/services",
        languages: {
          en: "https://drugcarts.com/services",
        },
      },
      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: "https://drugcarts.com/services",
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
