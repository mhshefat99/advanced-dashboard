import { getProductById, deleteProductById } from "@/services/productsApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorComponent from "@/components/ErrorComponent";
import CreateEditButton from "@/components/CreateEditButton";
import Breadcrumb from "@/components/Breadcrumb";

function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["singleProduct", productId],
    queryFn: () => getProductById(productId),
  });

  const product = data?.data;

  const { mutate: deleteProduct, isLoading: isDeleting } = useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      navigate("/products");
    },
    onError: () => alert("Failed to delete the product."),
  });

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    deleteProduct(productId);
  };

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="p-4 text-gray-800 dark:text-gray-100">
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/" },
          { label: "Products", to: "/products" },
          { label: product?.name || "Product Details" },
        ]}
      />

      {isLoading && <LoadingSpinner />}
      {!isLoading && error && <ErrorComponent error={error} />}

      {!isLoading && !error && (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Product Images */}
          <div>
            <img
              src={product.coverImage}
              alt="product"
              className="h-auto w-full rounded-lg border shadow-md dark:border-gray-700"
            />
            {product.galleryImages?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {product.galleryImages.map((img, index) => (
                  <div key={index} className="w-1/4">
                    <img
                      src={img}
                      alt={`Gallery ${index}`}
                      className="h-auto w-full rounded border dark:border-gray-700"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {product.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Category:</span>{" "}
              {product.subCategory}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Price:</span> ${product.price}
              {product.prevPrice && (
                <span className="ml-2 text-gray-400 line-through dark:text-gray-500">
                  ${product.prevPrice}
                </span>
              )}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Created at:</span>{" "}
              {formatDate(product.createdAt)}
            </p>
            {product.updatedAt && (
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Updated at:</span>{" "}
                {formatDate(product.updatedAt)}
              </p>
            )}
            <div>
              <p className="mb-1 font-medium text-gray-800 dark:text-gray-100">
                Description:
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <CreateEditButton
                sessionType="edit"
                itemToEdit={product}
                editBtn={
                  <Button variant="outline" className="px-6">
                    Edit
                  </Button>
                }
              />
              <Button
                className="bg-red-600 px-6 text-white hover:bg-red-700"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
