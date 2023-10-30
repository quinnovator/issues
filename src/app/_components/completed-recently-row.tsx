"use client";

import { api } from "@/trpc/react";
import IssueCard from "./issue-card";
import IssueRow from "./issue-row";
import Loader from "./loader";

export default function CompletedRecentlyRow() {
  const { data: completed, isLoading } =
    api.issue.getCompletedIssues.useQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <IssueRow title="Completed Recently (last 30 days)">
      {(completed ?? []).map((issue) => (
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
