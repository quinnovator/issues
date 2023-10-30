"use client";

import { api } from "@/trpc/react";
import IssueCard from "./issue-card";
import IssueRow from "./issue-row";
import Loader from "./loader";

export default function BacklogRow() {
  const { data: backlog, isLoading } = api.issue.getBacklogIssues.useQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <IssueRow title="Backlog">
      {(backlog ?? []).map((issue) => (
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
