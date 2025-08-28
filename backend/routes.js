import { Router } from "express";
const router = Router();

import ProductController from "./Controllers/ProductController.js";

router.get("/api/products", ProductController.getProducts);
router.post("/api/products", ProductController.createProduct);
router.delete("/api/products/:id", ProductController.deleteProduct);
router.put("/api/products/:id", ProductController.updateProduct);

export default router;
