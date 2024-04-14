import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ProductSpecific } from "../type";

const CACHE_DURATION = 5 * 60 * 1000;

const useProduct = (
  id: string | undefined
): [ProductSpecific | undefined, boolean, Error | null, () => void] => {
  const [product, setProduct] = useState<ProductSpecific | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    const now = new Date().getTime();
    const cacheKey = `product_${id}`;
    const cacheEntry = sessionStorage.getItem(cacheKey);
    const parsedCache = cacheEntry ? JSON.parse(cacheEntry) : null;

    if (parsedCache && parsedCache.expiry > now) {
      setProduct(parsedCache.data);
      setIsLoading(false);
    } else {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        const data: ProductSpecific = response.data;
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({
            expiry: now + CACHE_DURATION,
            data,
          })
        );
        setProduct(data);
        setIsLoading(false);
      } catch (err) {
        setError(err as unknown as Error);
        setIsLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return [product, isLoading, error, fetchProduct];
};

export default useProduct;
