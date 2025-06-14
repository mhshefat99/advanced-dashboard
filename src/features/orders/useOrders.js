import { getOrders } from "@/services/ordersApi";
import { useQuery } from "@tanstack/react-query";

export default function useOrders() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  console.log(data?.data);
  return {
    orders: data?.data,
    numberOfOrders: data?.totalCount,
    isLoading,
    error,
  };
}
