import { Card } from "@/components/ui/card";
import IssueCard from "@/components/issue-card";
import Image from "next/image";
import { api } from "@/trpc/server";

export default async function Home() {
  const inProgress = await api.issue.getInProgressIssues.query();
  const completed = await api.issue.getCompletedIssues.query();
  const backlog = await api.issue.getBacklogIssues.query();

  return (
    <main className="flex flex-col gap-4 p-12">
      <div className="flex w-full items-center justify-center gap-1">
        <Image
          src="/mv_logo_dark.png"
          alt="MyVoice Logo"
          width={60}
          height={60}
        />
        <p className="text-lg font-medium">MyVoice Issue Tracker</p>
      </div>
      <div className="space-y-10 pl-4">
        <IssueRow title="In Progress">
          {inProgress.map((issue) => (
            <IssueCard
              key={issue.id}
              priority={issue.priority}
              title={issue.title}
              description={issue.description}
            />
          ))}
        </IssueRow>
        <IssueRow title="Completed Recently (last 30 days)">
          {completed.map((issue) => (
            <IssueCard
              key={issue.id}
              priority={issue.priority}
              title={issue.title}
              description={issue.description}
            />
          ))}
        </IssueRow>
        <IssueRow title="Backlog">
          {backlog.map((issue) => (
            <IssueCard
              key={issue.id}
              priority={issue.priority}
              title={issue.title}
              description={issue.description}
            />
          ))}
        </IssueRow>
      </div>
    </main>
  );
}

function IssueRow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-medium underline">{title}</h2>
      <Card className="mt-4 grid grid-flow-col gap-4 overflow-x-scroll border-none shadow-none">
        {children}
      </Card>
    </div>
  );
}
