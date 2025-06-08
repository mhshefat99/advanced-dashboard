import OrdersTable from "@/features/orders/OrdersTable";
function OrdersPage() {
  return (
    <div>
      <h2 className="my-2 py-2 text-xl font-bold">Orders</h2>
      <OrdersTable />
    </div>
  );
}

export default OrdersPage;
