import { issueRouter } from "@/server/api/routers/issue";
import { createTRPCRouter } from "@/server/api/trpc";
import { utilsRouter } from "./routers/utils";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  issue: issueRouter,
  utils: utilsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
