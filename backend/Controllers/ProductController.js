import ProductRepository from "../Repositories/ProductRepository.js";

class ProductController {
  async getProducts(request, response) {
    const products = await ProductRepository.get();
    response.status(products.status).send(products);
  }

  async createProduct(request, response) {
    const product = request.body;
    console.log(product);


    if (!product.name || !product.priceInCents || !product.image)
      response
        .status(400)
        .send({ success: false, error: "Provide all required fields" });
    else {
      const res = await ProductRepository.create(product);
      response.status(res.status).send(res);
    }
  }

  async deleteProduct(request, response) {
    const { id } = request.params;
    const res = await ProductRepository.delete(id);
    response.status(res.status).send(res);
  }

  async updateProduct(request, response) {
    const { id } = request.params;
    const { name, priceInCents, image } = request.body;
    const updatedProduct = {
      name,
      priceInCents,
      image
    }
    console.log(updatedProduct)
    const res = await ProductRepository.update(id, updatedProduct);
    response.status(res.status).send(res);
  }
}

export default new ProductController();
