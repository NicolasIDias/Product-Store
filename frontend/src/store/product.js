import { create } from "zustand";

export const useProductStore = create((setter) => ({
  products: [],
  setProducts: (products) => setter({ products: products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.priceInCents || !newProduct.image)
      return { success: false, message: "Provide all fields" };

    //console.log(newProduct)
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    console.log(data);
    setter((state) => ({ products: [...state.products, data.create] }));
    return { success: true, message: "Product registered successfully" };
  },
  fetchProducts: async () => {
    const response = await fetch("/api/products")
    const data = await response.json()
    setter({ products: data.data })
  }
}));
