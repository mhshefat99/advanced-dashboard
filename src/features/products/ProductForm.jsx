import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, Controller } from "react-hook-form";
import { editProductById, createProduct } from "@/services/productsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function ProductForm({ sessionType, productToEdit, onFormSubmission }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: productToEdit?.name || "",
      price: productToEdit?.price || "",
      prevPrice: productToEdit?.prevPrice || "",
      category: productToEdit?.category || "",
      subCategory: productToEdit?.subCategory || "",
      coverImage: productToEdit?.coverImage || "",
      stock: productToEdit?.stock || "",
      tags: productToEdit?.tags || [],
      description: productToEdit?.description || "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      onFormSubmission();
      reset();
    },
    onError: (error) => {
      setErrorMessage("Failed to create product. Please try again.");
    },
  });

  const editMutation = useMutation({
    mutationFn: (data) => editProductById(data, productToEdit.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["singleProduct", productToEdit.id]);
      onFormSubmission();
      reset();
    },
    onError: (error) => {
      setErrorMessage("Failed to update product. Please try again.");
    },
  });

  const onSubmit = (formData) => {
    const transformedData = {
      ...formData,
      prevPrice: Number(formData.prevPrice),
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    if (sessionType === "edit") {
      editMutation.mutate(transformedData);
    } else {
      createMutation.mutate(transformedData);
    }
  };

  const isSubmitting = createMutation.isPending || editMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 text-sm md:text-base"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        {sessionType === "edit" ? "Edit Product" : "Create Product"}
      </h3>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Form fields remain unchanged */}
      {/* Name */}
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter product name" {...register("name")} />
        <FormError>{errors.name?.message}</FormError>
      </FormGroup>

      {/* Price and PrevPrice */}
      <FormGroup>
        <FormLabel>Price</FormLabel>
        <Input type="number" placeholder="Price" {...register("prevPrice")} />
        <FormError>{errors.prevPrice?.message}</FormError>
      </FormGroup>

      <FormGroup>
        <FormLabel>Discounted Price</FormLabel>
        <Input
          type="number"
          placeholder="Discounted Price"
          {...register("price")}
        />
        <FormError>{errors.price?.message}</FormError>
      </FormGroup>

      {/* Category */}
      <FormGroup>
        <FormLabel>Category</FormLabel>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FormError>{errors.category?.message}</FormError>
      </FormGroup>

      {/* SubCategory */}
      <FormGroup>
        <FormLabel>Sub Category</FormLabel>
        <Controller
          name="subCategory"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose sub-category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>MEN</SelectLabel>
                  <SelectItem value="mens-formal-shoes">
                    Mens Formal Shoes
                  </SelectItem>
                  <SelectItem value="mens-casual-shoes">
                    Mens Casual Shoes
                  </SelectItem>
                  <SelectItem value="mens-sports-shoes">
                    Mens Sports Shoes
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>WOMEN</SelectLabel>
                  <SelectItem value="womens-casual-shoes">
                    Womens Casual Shoes
                  </SelectItem>
                  <SelectItem value="womens-sports-shoes">
                    Womens Sports Shoes
                  </SelectItem>
                  <SelectItem value="womens-heels">Womens Heels</SelectItem>
                  <SelectItem value="womens-boots">Womens Boots</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>KIDS</SelectLabel>
                  <SelectItem value="kids-formal-shoes">
                    Kids Formal Shoes
                  </SelectItem>
                  <SelectItem value="kids-sneakers">Kids Sneakers</SelectItem>
                  <SelectItem value="kids-sandals">Kids Sandals</SelectItem>
                  <SelectItem value="kids-boots">Kids Boots</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <FormError>{errors.subCategory?.message}</FormError>
      </FormGroup>

      {/* Cover Image */}
      <FormGroup>
        <FormLabel>Cover image URL</FormLabel>
        <Input
          type="url"
          placeholder="https://..."
          {...register("coverImage")}
        />
        <FormError>{errors.coverImage?.message}</FormError>
      </FormGroup>

      {/* Stock */}
      <FormGroup>
        <FormLabel>Stock</FormLabel>
        <Input type="number" placeholder="Stock" {...register("stock")} />
        <FormError>{errors.stock?.message}</FormError>
      </FormGroup>

      {/* Tags */}
      <FormGroup>
        <FormLabel>Tags</FormLabel>
        <div className="grid grid-cols-2 gap-2">
          <Controller
            name="tags"
            control={control}
            render={({ field }) =>
              [
                "formal-shoes",
                "casual-shoes",
                "sports-shoes",
                "sandals",
                "heels",
                "boots",
              ].map((tag) => (
                <label key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value.includes(tag)}
                    onCheckedChange={(checked) => {
                      const updated = checked
                        ? [...field.value, tag]
                        : field.value.filter((t) => t !== tag);
                      setValue("tags", updated);
                    }}
                  />
                  <span className="capitalize">{tag.replace("-", " ")}</span>
                </label>
              ))
            }
          />
        </div>
        <FormError>{errors.tags?.message}</FormError>
      </FormGroup>

      {/* Description */}
      <FormGroup>
        <FormLabel>Description</FormLabel>
        <Textarea placeholder="Description" {...register("description")} />
        <FormError>{errors.description?.message}</FormError>
      </FormGroup>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting
            ? sessionType === "edit"
              ? "Updating..."
              : "Creating..."
            : sessionType === "edit"
              ? "Update Product"
              : "Create Product"}
        </button>
      </div>
    </form>
  );
}

// Helper components
function FormLabel({ children }) {
  return <label className="mb-1 block text-sm font-medium">{children}</label>;
}

function FormGroup({ children }) {
  return <div className="flex flex-col space-y-1">{children}</div>;
}

function FormError({ children }) {
  return <span className="text-sm text-red-500">{children}</span>;
}

export default ProductForm;
