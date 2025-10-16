const API_KEY = "ae4fdbfe6e994c3f95297019d06be170";
const BASE_URL = "https://newsapi.org/v2";

// helper
async function fetchWithProxy(url: string) {
  const isLocal = window.location.hostname === "localhost";
  const finalUrl = isLocal
    ? url
    : `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(finalUrl);
    if (!response.ok) throw new Error("Failed to fetch data");

    if (isLocal) {
      return await response.json();
    } else {
      const proxyData = await response.json();
      return JSON.parse(proxyData.contents);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // لو فشل الطلب نرجع null
  }
}

// الأخبار الرئيسية
export async function getTopHeadlines(country: string, page = 1, pageSize = 9) {
  const url = `${BASE_URL}/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  const data = await fetchWithProxy(url);

  return data
    ? { articles: data.articles ?? [], totalResults: data.totalResults ?? 0 }
    : { articles: [], totalResults: 0 };
}

// الأخبار حسب التصنيف
export async function getCategoryNews(category: string, page = 1, pageSize = 9, country = "us") {
  const url = `${BASE_URL}/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  const data = await fetchWithProxy(url);

  return data
    ? { articles: data.articles ?? [], totalResults: data.totalResults ?? 0 }
    : { articles: [], totalResults: 0 };
}
