import { api } from "@/trpc/server";
import type { Metadata } from "next";

type Props = {
  params: { issueId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.issueId;

  // fetch data
  const issue = await api.issue.getIssue.query(id);

  return {
    title: issue.title,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
