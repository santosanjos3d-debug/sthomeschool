import { router, publicProcedure } from '../_core/trpc';
import { z } from 'zod';
import { exchangeCodeForToken, refreshAccessToken } from '../services/melhorEnvioOAuth';

export const authRouter = router({
  /**
   * Exchange authorization code for access token
   * Called after user authorizes the app in Melhor Envio
   */
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

  /**
   * Refresh access token using refresh token
   */
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
});
