import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { createAdminSession, getAdminSessionByToken, markAdminSessionAsUsed } from "../db";

const ADMIN_EMAIL = "giorgio@sthomeschool.com";
const TOKEN_EXPIRY_HOURS = 24;

export const adminAuthRouter = router({
  // Request login link
  requestLoginLink: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      try {
        // Only allow the admin email
        if (input.email !== ADMIN_EMAIL) {
          return {
            success: false,
            error: "Email não autorizado",
          };
        }

        // Create session token that expires in 24 hours
        const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
        const session = await createAdminSession(input.email, expiresAt);

        if (!session) {
          return {
            success: false,
            error: "Erro ao criar sessão",
          };
        }

        // TODO: Send email with login link
        // For now, return the token for testing (remove in production)
        console.log(`[Admin Auth] Login link for ${input.email}: /admin-login?token=${session.token}`);

        return {
          success: true,
          message: "Link de acesso enviado para seu email",
          // Remove this in production - only for testing
          testToken: session.token,
        };
      } catch (error) {
        console.error("[Admin Auth] Error requesting login link:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Erro ao solicitar link",
        };
      }
    }),

  // Validate token and create session
  validateToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const session = await getAdminSessionByToken(input.token);

        if (!session) {
          return {
            success: false,
            error: "Token inválido",
          };
        }

        // Check if token has expired
        if (new Date() > session.expiresAt) {
          return {
            success: false,
            error: "Link expirou. Solicite um novo link.",
          };
        }

        // Check if token was already used
        if (session.usedAt) {
          return {
            success: false,
            error: "Link já foi utilizado",
          };
        }

        // Mark token as used
        await markAdminSessionAsUsed(input.token);

        return {
          success: true,
          message: "Acesso concedido",
          token: input.token,
        };
      } catch (error) {
        console.error("[Admin Auth] Error validating token:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Erro ao validar token",
        };
      }
    }),

  // Check if token is valid (for middleware)
  checkToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      try {
        const session = await getAdminSessionByToken(input.token);

        if (!session) {
          return { valid: false };
        }

        // Check if token has expired
        if (new Date() > session.expiresAt) {
          return { valid: false };
        }

        // Check if token was used
        if (!session.usedAt) {
          return { valid: false };
        }

        return { valid: true };
      } catch (error) {
        console.error("[Admin Auth] Error checking token:", error);
        return { valid: false };
      }
    }),
});
