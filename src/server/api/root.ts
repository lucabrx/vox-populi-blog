import { createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "./routers/posts";
import { unsplashRoute } from "./routers/unsplash";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    post : postRouter,
    user : userRouter,
    unsplash: unsplashRoute
});

// export type definition of API
export type AppRouter = typeof appRouter;
