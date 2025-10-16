import { useFavorites } from "../../Contaxt/Favorit";
import type { NewsArticle } from "../../interfaces";
import { Heart, ImageOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../Anmation/AnimatedSection";
interface IProps {
  article: NewsArticle;
}

const Index = ({ article }: IProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(article);

  const toggleFavorite = () => {
    favorite ? removeFavorite(article) : addFavorite(article);
  };

  // صورة افتراضية لو الرابط غير صالح أو فاضي
  const isValidImage = article.urlToImage && article.urlToImage.startsWith("http");

  return (
    <AnimatedSection direction="right" stagger={0.2} className="flex flex-col items-center gap-6">
    <div className="max-w-sm w-full bg-[#1A1A1A]  border border-gray-200  rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* الصورة */}
      
      <div className="w-full h-48 overflow-hidden bg-gray-200  flex items-center justify-center">
        {isValidImage ? (
          <img
            src={article.urlToImage}
            alt={article.title || "Article image"}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <ImageOff className="h-10 w-10 mb-2 text-gray-400" />
            <p className="text-sm text-gray-400">No image available</p>
          </div>
        )}
      </div>

      {/* المحتوى */}
      <div className="flex flex-col flex-grow p-4">
        <h2 className="text-lg font-semibold text-[#FFC300] mb-2 line-clamp-2">
          {article.title}
        </h2>
        <p className="text-sm text-[#FFC300] flex-grow line-clamp-3">
          {article.description}
        </p>

        {/* الروابط والأزرار */}
        <div className="flex items-center justify-between mt-4">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className=" text-white hover:text-[#FF007F]
 hover:underline text-sm font-medium"
          >
            Read more →
          </a>

           <motion.button
            onClick={toggleFavorite}
            className="text-2xl relative"
            whileTap={{ scale: 0.8 }}
          >
            <AnimatePresence>
              {favorite && (
                <motion.span
                  key="heart"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1], opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center text-red-600"
                >
                  <Heart fill="currentColor" className="h-7 w-7" />
                </motion.span>
              )}
            </AnimatePresence>

            {/* القلب الأساسي */}
            <Heart
              className={`h-7 w-7 transition-colors duration-300 ${
                favorite ? "text-red-600" : "text-gray-400"
              }`}
            />
          </motion.button>
        </div>
        
      </div>

    </div>
    </AnimatedSection>
  );
};

export default Index;
