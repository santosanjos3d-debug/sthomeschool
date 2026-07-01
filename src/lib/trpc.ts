import { createTRPCReact } from "@trpc/react-query";

// Placeholder type — the server router module isn't in this repo.
// When deploying, generate the type from the actual server build.
export type AppRouter = Record<string, unknown>;

export const trpc = createTRPCReact<AppRouter>();
