import { getProducts } from "@/services/productsApi";
import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return {
    products: data?.data,
    numberOfProducts: data?.totalCount,
    isLoading,
    error,
  };
}
