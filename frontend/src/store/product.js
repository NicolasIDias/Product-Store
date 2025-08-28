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
    setter((state) => ({ products: [...state.products, data] }));
    return { success: true, message: "Product registered successfully" };
  },
  fetchProducts: async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setter({ products: data.data });
  },

  deleteProduct: async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!result.success) return { success: false, message: result.error };
    setter((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    }));
    return { success: true, message: "Product deleted successfully" };
  },

  updateProduct: async (productId, updatedProduct) => {
    console.log(updatedProduct)
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProduct)
    })
    const data = await response.json()
    console.log(data)
    if(!data.success) return { success: false, error: data.error } 
    setter((state) => ({
      products: state.products.map((product) => (product.id == productId) ? data.data : product)
    }))
    return { success: true, message: "Product updated successfully" }
  }
}));
