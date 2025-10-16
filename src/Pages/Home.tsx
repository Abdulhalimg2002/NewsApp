import { useEffect, useState } from "react";
import NewCard from "../components/NewCard";
import type { NewsArticle } from "../interfaces";
import { getTopHeadlines } from "../servies/newsAPI";

const Home = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 9; // عدد الأخبار لكل صفحة

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTopHeadlines("us", page, pageSize);
        // ✅ تحقق من وجود البيانات
        setArticles(Array.isArray(data?.articles) ? data.articles : []);
        setTotalResults(data?.totalResults || 0);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [page]);

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="p-6 b">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#FFC300]">Latest News</h1>

      {/* ✅ حالة الخطأ */}
      {error && (
        <p className="text-center text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* ✅ حالة التحميل */}
      {loading ? (
        <p className="text-center text-white animate-pulse hidden">Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.isArray(articles) && articles.length > 0 ? (
            articles.map((article, i) => <NewCard key={i} article={article} />)
          ) : (
            <p className="text-center text-gray-500">No news available.</p>
          )}
        </div>
      )}

      {/* ✅ Pagination ديناميكي */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-[#007BFF] text-white rounded disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 border rounded transition-colors ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[#007BFF] text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
