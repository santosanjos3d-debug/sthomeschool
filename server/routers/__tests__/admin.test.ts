import { describe, it, expect, beforeAll } from "vitest";
import { getAllProducts, getAllOrders, createProduct, getProductById } from "../../db";

describe("Admin Router", () => {
  describe("Product Management", () => {
    it("should get all products", async () => {
      const products = await getAllProducts();
      expect(Array.isArray(products)).toBe(true);
    });

    it("should create a new product", async () => {
      const product = await createProduct({
        name: "Test Product",
        description: "Test Description",
        price: 9999,
        imageUrl: "https://example.com/image.jpg",
        weight: 500,
        length: 10,
        width: 10,
        height: 10,
        active: true,
      });

      expect(product).toBeDefined();
      expect(product?.name).toBe("Test Product");
      expect(product?.price).toBe(9999);
    });

    it("should get product by ID", async () => {
      const products = await getAllProducts();
      if (products.length > 0) {
        const product = await getProductById(products[0].id);
        expect(product).toBeDefined();
        expect(product?.id).toBe(products[0].id);
      }
    });
  });

  describe("Order Management", () => {
    it("should get all orders", async () => {
      const orders = await getAllOrders();
      expect(Array.isArray(orders)).toBe(true);
    });
  });
});
