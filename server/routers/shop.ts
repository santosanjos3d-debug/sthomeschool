import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getProducts, getProductById, createOrder, createOrderItem, getOrderByNumber, getOrderItems } from "../db";

export const shopRouter = router({
  // Get all active products
  getProducts: publicProcedure.query(async () => {
    try {
      return await getProducts();
    } catch (error) {
      console.error("[Shop] Error fetching products:", error);
      return [];
    }
  }),

  // Get single product by ID
  getProduct: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      try {
        return await getProductById(input.id);
      } catch (error) {
        console.error("[Shop] Error fetching product:", error);
        return null;
      }
    }),

  // Create order
  createOrder: publicProcedure
    .input(
      z.object({
        customerName: z.string(),
        customerEmail: z.string().email(),
        customerPhone: z.string().optional(),
        shippingAddress: z.string(),
        shippingCity: z.string(),
        shippingState: z.string().length(2),
        shippingZip: z.string(),
        shippingMethod: z.string().optional(),
        shippingCost: z.number().optional(),
        items: z.array(
          z.object({
            productId: z.number(),
            quantity: z.number().min(1),
          })
        ),
        paymentMethod: z.enum(["pix", "stripe"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Calculate subtotal
        let subtotal = 0;
        const orderItemsData = [];

        for (const item of input.items) {
          const product = await getProductById(item.productId);
          if (!product) {
            throw new Error(`Product ${item.productId} not found`);
          }

          const itemSubtotal = product.price * item.quantity;
          subtotal += itemSubtotal;

          orderItemsData.push({
            productId: item.productId,
            productName: product.name,
            productPrice: product.price,
            quantity: item.quantity,
            subtotal: itemSubtotal,
          });
        }

        const shippingCost = input.shippingCost || 0;
        const total = subtotal + shippingCost;

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Create order
        const order = await createOrder({
          orderNumber,
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone || null,
          shippingAddress: input.shippingAddress,
          shippingCity: input.shippingCity,
          shippingState: input.shippingState,
          shippingZip: input.shippingZip,
          shippingMethod: input.shippingMethod || null,
          shippingCost,
          subtotal,
          total,
          paymentMethod: input.paymentMethod,
          paymentStatus: "pending",
        });

        if (!order) {
          throw new Error("Failed to create order");
        }

        // Create order items
        for (const itemData of orderItemsData) {
          await createOrderItem({
            orderId: order.id,
            ...itemData,
          });
        }

        // TODO: Send email notification to owner

        return {
          success: true,
          order: {
            id: order.id,
            orderNumber: order.orderNumber,
            total: order.total,
          },
        };
      } catch (error) {
        console.error("[Shop] Error creating order:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to create order",
        };
      }
    }),

  // Get order by number
  getOrder: publicProcedure
    .input(z.object({ orderNumber: z.string() }))
    .query(async ({ input }) => {
      try {
        const order = await getOrderByNumber(input.orderNumber);
        if (!order) {
          return null;
        }

        const items = await getOrderItems(order.id);
        return {
          ...order,
          items,
        };
      } catch (error) {
        console.error("[Shop] Error fetching order:", error);
        return null;
      }
    }),
});
