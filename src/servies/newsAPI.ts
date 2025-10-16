import type { NewsArticle } from "../interfaces";

const API_KEY = "cfbda0c009e442a3a1c9eeb7d217f39f"; // مفتاحك الجديد
const BASE_URL = "https://newsapi.org/v2";

export async function getTopHeadlines(
  country: string,
  page: number = 1,
  pageSize: number = 9
): Promise<{ articles: NewsArticle[]; totalResults: number }> {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );
    const data = await response.json();

    return {
      articles: data?.articles ?? [],
      totalResults: data?.totalResults ?? 0,
    };
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return { articles: [], totalResults: 0 }; // fallback
  }
}

export async function getCategoryNews(
  category: string,
  page: number = 1,
  pageSize: number = 9,
  country: string = "us"
): Promise<{ articles: NewsArticle[]; totalResults: number }> {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );
    const data = await response.json();

    return {
      articles: data?.articles ?? [],
      totalResults: data?.totalResults ?? 0,
    };
  } catch (error) {
    console.error(`Error fetching category (${category}) news:`, error);
    return { articles: [], totalResults: 0 }; // fallback
  }
}
