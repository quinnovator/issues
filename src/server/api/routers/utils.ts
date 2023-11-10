import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { sql } from "drizzle-orm";

export const utilsRouter = createTRPCRouter({
  // Gets a single issue by ID
  warmDb: publicProcedure.query(async () => {
    const result = await db.execute(sql`
    SELECT COUNT(*) as count from issues_post;
`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const count = result?.rows[0];

    return count;
  }),
});
