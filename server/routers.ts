import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { shippingRouter } from "./routers/shipping";
import { shopRouter } from "./routers/shop";
import { adminRouter } from "./routers/admin";
import { adminAuthRouter } from "./routers/adminAuth";
import { z } from "zod";
import { exchangeCodeForToken, refreshAccessToken } from "./services/melhorEnvioOAuth";

export const appRouter = router({
  system: systemRouter,
  shipping: shippingRouter,
  shop: shopRouter,
  admin: adminRouter,
  adminAuth: adminAuthRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    exchangeMelhorEnvioCode: publicProcedure
      .input(
        z.object({
          code: z.string(),
          redirectUri: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const token = await exchangeCodeForToken(input.code, input.redirectUri);
          return {
            success: true,
            token,
          };
        } catch (error) {
          console.error('OAuth token exchange error:', error);
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      }),
    refreshMelhorEnvioToken: publicProcedure
      .input(
        z.object({
          refreshToken: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const token = await refreshAccessToken(input.refreshToken);
          return {
            success: true,
            token,
          };
        } catch (error) {
          console.error('Token refresh error:', error);
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
