import Product from "../Models/product.model.js";
import { uuid } from "../services/uuid.js";
class ProductRepository {
  async get() {
    try {
      const products = await Product.find({});
      const response = {
        status: 200,
        success: true,
        data: products,
      };
      return response;
    } catch (Error) {
      const response = {
        status: 500,
        success: false,
        error: Error,
      };
      return response;
    }
  }

  async create(product) {
    const { name, priceInCents, image } = product;

    const id = uuid();

    try {
      const create = await Product.create({
        id: id,
        name: name,
        priceInCents: priceInCents,
        image: image,
      });
      const response = {
        status: 201,
        success: true,
        object: create,
      };
      return response;
    } catch (Error) {
      const response = {
        status: 500,
        success: false,
        error: Error,
      };
      return response;
    }
  }
  async delete(id) {
    try {
      await Product.findOneAndDelete({ id: id });
      //const p = await Product.findOne({id: id});
      //console.log(p)
      const response = {
        status: 201,
        success: true,
      };
      return response;
    } catch (Error) {
      const response = {
        status: 500,
        success: false,
        error: Error,
      };
      return response;
    }
  }

  async update(id, newProduct) {
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { id: id, newProduct },
        { new: true }
      );
      const response = {
        status: 201,
        success: true,
        data: updatedProduct,
      };
      return response;
    } catch (Error) {
      const response = {
        status: 500,
        success: false,
        error: Error,
      };
      return response;
    }
  }
}

export default new ProductRepository();
