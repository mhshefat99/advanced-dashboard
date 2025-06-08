export default function filterOrders(orders, query) {
  let filteredOrders = orders;
  if (query && query !== "") {
    filteredOrders = filteredOrders.filter((order) =>
      order.name.toLowerCase().includes(query.toLowerCase()),
    );
  }
  return filteredOrders;
}
