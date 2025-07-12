export const dynamic = "force-dynamic";
export async function GetDrugService(
  page = 1,
  limit = 8,
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/service?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 60 }, // optional: cache control
      }
    );
    console.log(response, "DATAAA");
    return await response.json();
  } catch (error) {
    console.error("Product Type fetch error:", error);
    return [];
  }
}