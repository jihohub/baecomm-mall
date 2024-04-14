import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ProductSimple } from "../type";

const CACHE_DURATION = 5 * 60 * 1000;

const useProducts = (): [
  ProductSimple[],
  boolean,
  boolean,
  Error | null,
  () => void,
  (newQuery: string) => void
] => {
  const [products, setProducts] = useState<ProductSimple[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [query, setQuery] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);
  const LIMIT = 10;
  const SELECT = "thumbnail,brand,title,price";

  const updateQuery = (newQuery: string) => {
    setProducts([]);
    setQuery(newQuery);
  };

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const cacheKey = query
      ? `products_search_${query}_${skip}`
      : `products_${skip}`;
    const now = new Date().getTime();
    const cacheEntry = sessionStorage.getItem(cacheKey);
    const parsedCache = cacheEntry ? JSON.parse(cacheEntry) : null;

    if (parsedCache && parsedCache.expiry > now) {
      setProducts((prevProducts) => [...prevProducts, ...parsedCache.data]);
      setIsLoading(false);
    } else {
      try {
        const response = await axios.get(
          query
            ? "https://dummyjson.com/products/search"
            : "https://dummyjson.com/products",
          {
            params: query
              ? { q: query }
              : { limit: LIMIT, skip, select: SELECT },
          }
        );

        const newData = response.data.products;
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({
            expiry: now + CACHE_DURATION,
            data: newData,
          })
        );
        setProducts((prevProducts) => [...prevProducts, ...newData]);
        setHasMore(
          response.data.total > response.data.skip + response.data.limit
        );
        setIsLoading(false);
      } catch (err) {
        setError(err as unknown as Error);
        setIsLoading(false);
      }
    }
  }, [query, skip]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, query, skip]);

  const fetchMoreProducts = () => {
    setSkip((prev) => prev + LIMIT);
  };

  return [products, hasMore, isLoading, error, fetchMoreProducts, updateQuery];
};

export default useProducts;
