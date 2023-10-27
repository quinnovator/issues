import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import linear from "@/server/linear";

export const issueRouter = createTRPCRouter({
  // Gets a single issue by ID
  getIssue: publicProcedure.input(z.string()).query(async ({ input }) => {
    const issue = await linear.issue(input);

    return issue;
  }),

  // Gets all issues currently in progress
  getInProgressIssues: publicProcedure.query(async () => {
    const states = await linear.workflowStates({
      filter: {
        type: {
          eq: "started",
        },
      },
    });

    const issues = (
      await Promise.all(
        states.nodes.map(async (state) => {
          return (await state.issues()).nodes;
        }),
      )
    ).flat();

    return issues;
  }),

  // Gets all issues that have been completed in the last month
  getCompletedIssues: publicProcedure.query(async () => {
    const states = await linear.workflowStates({
      filter: {
        type: {
          eq: "completed",
        },
      },
    });

    const issues = (
      await Promise.all(
        states.nodes.map(async (state) => {
          return (await state.issues()).nodes;
        }),
      )
    ).flat();

    return issues;
  }),

  // Gets all issues in the backlog
  getBacklogIssues: publicProcedure.query(async () => {
    const states = await linear.workflowStates({
      filter: {
        type: {
          in: ["backlog", "unstarted"],
        },
      },
    });

    const issues = (
      await Promise.all(
        states.nodes.map(async (state) => {
          return (await state.issues()).nodes;
        }),
      )
    ).flat();

    return issues;
  }),
});
