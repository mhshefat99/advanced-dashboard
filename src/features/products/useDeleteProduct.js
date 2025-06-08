// ✅ FIXED useDeleteProduct.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductById } from "@/services/productsApi";

export default function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteProductById(id), // ✅ Accept id at call time
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      alert("Product could not be deleted");
    },
  });
}
