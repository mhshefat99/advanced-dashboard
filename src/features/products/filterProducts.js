export default function filterProducts(products, query, category) {
  console.log(category);
  let filteredProducts = products;

  if (query) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.subCategory === category,
    );
  }
  console.log(filteredProducts);

  return filteredProducts;
}
