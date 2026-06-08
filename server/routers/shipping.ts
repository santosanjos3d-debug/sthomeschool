import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { calculateShipping } from "../services/melhorEnvio";

export const shippingRouter = router({
  calculate: publicProcedure
    .input(
      z.object({
        fromPostalCode: z.string(),
        toPostalCode: z.string(),
        products: z.array(
          z.object({
            id: z.string(),
            width: z.number(),
            height: z.number(),
            length: z.number(),
            weight: z.number(),
            insuranceValue: z.number(),
            quantity: z.number(),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      try {
        const params = {
          from: {
            postal_code: input.fromPostalCode.replace(/\D/g, ""),
          },
          to: {
            postal_code: input.toPostalCode.replace(/\D/g, ""),
          },
          products: input.products.map((p) => ({
            id: p.id,
            width: p.width,
            height: p.height,
            length: p.length,
            weight: p.weight,
            insurance_value: p.insuranceValue,
            quantity: p.quantity,
          })),
        };

        const quotes = await calculateShipping(params);

        const formattedQuotes = quotes.map((quote: any) => ({
          id: quote.id,
          name: quote.name,
          price: parseFloat(quote.price),
          deliveryTime: quote.delivery_time,
          deliveryRange: quote.delivery_range,
          company: quote.company.name,
          companyLogo: quote.company.picture,
        }));

        return {
          success: true,
          quotes: formattedQuotes,
        };
      } catch (error) {
        console.error("Erro ao calcular frete:", error);
        return {
          success: false,
          quotes: [],
          error: "Falha ao calcular frete. Tente novamente.",
        };
      }
    }),
});
