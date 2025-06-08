import MyTable from "@/components/MyTable";
import Columns from "./Columns";
import useProducts from "./useProducts";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import filterProducts from "./filterProducts";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorComponent from "@/components/ErrorComponent";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProductsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const { products, numberOfProducts, isLoading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (!products || products.length === 0) return;
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (category) {
      newSearchParams.set("category", category);
    } else {
      newSearchParams.delete("category");
    }

    if (query) {
      newSearchParams.set("query", query);
    } else {
      newSearchParams.delete("query");
    }

    setSearchParams(newSearchParams);

    const result = filterProducts(products, query, category);
    setFilteredProducts(result);
  }, [products, query, category, searchParams, setSearchParams]);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && <ErrorComponent error={error} />}
      {!isLoading && !error && (
        <div>
          <div className="flex flex-col justify-between gap-3 pt-2 pb-4 sm:flex-row sm:items-center">
            <div className="w-[400px] max-w-[400px]">
              <Input
                type="search"
                placeholder="search for products ..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <Select
                defaultValue={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Men</SelectLabel>
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
                    <SelectLabel>Womens</SelectLabel>
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
                    <SelectLabel>Womens</SelectLabel>
                    <SelectItem value="kids-formal-shoes">
                      Kids Formal Shoes
                    </SelectItem>
                    <SelectItem value="kids-sneakers">Kids Sneakers</SelectItem>
                    <SelectItem value="kids-sandals">Kids Sandals</SelectItem>
                    <SelectItem value="kids-boots">Kids Boots</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <MyTable
            columns={Columns}
            data={filteredProducts ? filteredProducts : products}
            numberOfResults={
              filteredProducts ? filteredProducts.length : numberOfProducts
            }
          />
        </div>
      )}
    </div>
  );
}

export default ProductsTable;
