import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrderItems,
} from "../db";

export const adminRouter = router({
  // Products
  getProducts: publicProcedure.query(async () => {
    try {
      return await getAllProducts();
    } catch (error) {
      console.error("[Admin] Error fetching products:", error);
      return [];
    }
  }),

  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        price: z.number().min(0),
        imageUrl: z.string().optional(),
        weight: z.number().optional(),
        length: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const product = await createProduct({
          name: input.name,
          description: input.description || null,
          price: Math.round(input.price * 100), // Convert to cents
          imageUrl: input.imageUrl || null,
          weight: input.weight || null,
          length: input.length || null,
          width: input.width || null,
          height: input.height || null,
          active: true,
        });

        return {
          success: true,
          product,
        };
      } catch (error) {
        console.error("[Admin] Error creating product:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to create product",
        };
      }
    }),

  updateProduct: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        imageUrl: z.string().optional(),
        weight: z.number().optional(),
        length: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        active: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const updates: any = {};
        if (input.name) updates.name = input.name;
        if (input.description !== undefined) updates.description = input.description;
        if (input.price !== undefined) updates.price = Math.round(input.price * 100);
        if (input.imageUrl !== undefined) updates.imageUrl = input.imageUrl;
        if (input.weight !== undefined) updates.weight = input.weight;
        if (input.length !== undefined) updates.length = input.length;
        if (input.width !== undefined) updates.width = input.width;
        if (input.height !== undefined) updates.height = input.height;
        if (input.active !== undefined) updates.active = input.active;

        const product = await updateProduct(input.id, updates);

        return {
          success: true,
          product,
        };
      } catch (error) {
        console.error("[Admin] Error updating product:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to update product",
        };
      }
    }),

  deleteProduct: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const success = await deleteProduct(input.id);
        return { success };
      } catch (error) {
        console.error("[Admin] Error deleting product:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to delete product",
        };
      }
    }),

  // Orders
  getOrders: publicProcedure.query(async () => {
    try {
      return await getAllOrders();
    } catch (error) {
      console.error("[Admin] Error fetching orders:", error);
      return [];
    }
  }),

  getOrderDetails: publicProcedure
    .input(z.object({ orderId: z.number() }))
    .query(async ({ input }) => {
      try {
        const order = await getOrderById(input.orderId);
        if (!order) {
          return null;
        }

        const items = await getOrderItems(order.id);
        return {
          ...order,
          items,
        };
      } catch (error) {
        console.error("[Admin] Error fetching order details:", error);
        return null;
      }
    }),

  updateOrderStatus: publicProcedure
    .input(
      z.object({
        orderId: z.number(),
        status: z.enum(["pending", "completed", "failed"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const order = await updateOrderStatus(input.orderId, input.status);
        return {
          success: true,
          order,
        };
      } catch (error) {
        console.error("[Admin] Error updating order status:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to update order status",
        };
      }
    }),
});
