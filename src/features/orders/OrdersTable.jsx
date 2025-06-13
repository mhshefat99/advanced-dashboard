import MyTable from "@/components/MyTable";
import Columns from "./Columns";
import useOrders from "./useOrders";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import filterOrders from "./filterOrders";
import { useSearchParams } from "react-router-dom";

function OrdersTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const { orders, numberOfOrders, isLoading, error } = useOrders();
  const [filteredOrders, setFilteredOrders] = useState(orders || []);

  useEffect(() => {
    if (!orders || orders.length === 0) return;
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (query) {
      newSearchParams.set("query", query);
    } else {
      newSearchParams.delete("query");
    }

    setSearchParams(newSearchParams);

    const result = filterOrders(orders, query);
    setFilteredOrders(result);
  }, [orders, query, searchParams, setSearchParams]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && (
        <div>
          <div className="flex flex-col justify-between gap-3 pt-2 pb-4 sm:flex-row sm:items-center">
            <div className="w-[400px] max-w-[400px]">
              <Input
                type="search"
                placeholder="search for orders ..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <MyTable
            columns={Columns}
            data={filteredOrders ? filteredOrders : orders}
            numberOfResults={
              filteredOrders ? filteredOrders.length : numberOfOrders
            }
          />
        </div>
      )}
    </div>
  );
}

export default OrdersTable;
