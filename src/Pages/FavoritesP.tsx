import { useFavorites } from "../Contaxt/Favorit";
import NewCard from "../components/NewCard";

const FavoritesP=()=>{
     const { favorites } = useFavorites();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-yellow-400">
        Favorite Articles ⭐
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No favorite articles yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {favorites.map((article, i) => (
            <NewCard key={i} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
export default FavoritesP;