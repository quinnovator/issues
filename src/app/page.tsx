import { Button } from "@/components/ui/button";
import Link from "next/link";
import InProgressRow from "./_components/in-progress-row";
import CompletedRecentlyRow from "./_components/completed-recently-row";
import BacklogRow from "./_components/backlog-row";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 p-12">
      <div className="flex flex-col items-center gap-4">
        <Link href="/new">
          <Button className="max-w-md">Create Issue</Button>
        </Link>
      </div>
      <div className="space-y-10 pl-4">
        <InProgressRow />
        <BacklogRow />
        <CompletedRecentlyRow />
      </div>
    </main>
  );
}
