import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import linear from "@/server/linear";

export const issueRouter = createTRPCRouter({
  // Gets a single issue by ID
  getIssue: publicProcedure.input(z.string()).query(async ({ input }) => {
    const issue = await linear.issue(input);

    return issue;
  }),

  // Get issue comments
  getIssueComments: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const graphQLClient = linear.client;
        const comments = await graphQLClient.rawRequest<
          {
            issue: {
              comments: { nodes: { body: string; createdAt: string }[] };
            };
          },
          { issueId: string }
        >(
          `
          query CommentQuery($issueId: String!) {
            issue(id: $issueId) {
              comments {
                nodes {
                  body
                  createdAt
                }
              }
            }
          }`,
          { issueId: input },
        );

        const list =
          comments.data?.issue.comments.nodes.map((c) => ({
            body: c.body,
            createdAt: c.createdAt,
          })) ?? [];

        return list;
      } catch (error) {
        console.error(error);
        return [];
      }
    }),

  // Leave a comment on an issue
  createIssueComment: publicProcedure
    .input(
      z.object({
        issueId: z.string(),
        body: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const comment = await linear.createComment({
        issueId: input.issueId,
        body: input.body,
      });

      return comment.success;
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

  // Create a new issue
  createIssue: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        priority: z.number().min(0).max(4),
        teamId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const issue = await linear.createIssue(input);

      return issue;
    }),
});
