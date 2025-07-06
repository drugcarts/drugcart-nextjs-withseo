// lib/getDynamicMetatags.jsx

export async function getDynamicMetatags(url) {
  if (!url) {
    throw new Error("Url is required");
  }
  const apiurl = `https://main.diinz06zqqfgz.amplifyapp.com/api/sub-category/catname/${url}`;
  try {
    const res = await fetch(
      apiurl,
      { cache: "no-store" } // or 'force-cache' if you want caching
    );
    return await res.json();
  } catch (error) {
    return { metas: [] };
  }
}
