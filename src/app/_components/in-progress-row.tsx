"use client";

import { api } from "@/trpc/react";
import IssueCard from "./issue-card";
import IssueRow from "./issue-row";
import Loader from "./loader";

export default function InProgressRow() {
  const { data: inProgress, isLoading } =
    api.issue.getInProgressIssues.useQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <IssueRow title="In Progress">
      {(inProgress ?? []).map((issue) => (
        <IssueCard
          key={issue.id}
          id={issue.id}
          priority={issue.priority}
          title={issue.title}
          description={issue.description}
        />
      ))}
    </IssueRow>
  );
}
