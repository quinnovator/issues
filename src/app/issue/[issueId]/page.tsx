import AddComment from "@/app/_components/add-comment";
import { api } from "@/trpc/server";

export default async function Page({
  params: { issueId },
}: {
  params: { issueId: string };
}) {
  const issue = await api.issue.getIssue.query(issueId);
  const comments = await api.issue.getIssueComments.query(issueId);

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between bg-white px-6 py-4 dark:bg-zinc-800/40">
        <div>
          <h1 className="text-2xl font-bold">{issue.title}</h1>
          <div className="mt-2 flex flex-col gap-4">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Priority: {issue.priorityLabel}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Created:{" "}
              {new Date(issue.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </header>
      <main className="flex flex-1">
        <div className="flex flex-1 flex-col overflow-y-auto border-r px-6 py-4">
          <section>
            <h2 className="mb-2 text-xl font-bold">Description</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {issue.description}
            </p>
          </section>
          <section className="mt-8 flex flex-col gap-4">
            <h2 className="mb-2 text-xl font-bold">Comments</h2>
            {comments.length === 0 && (
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                No comments yet.
              </p>
            )}
            {comments.length > 0 &&
              comments.map((comment, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-slate-100 p-4 shadow-sm dark:bg-zinc-800"
                >
                  <strong className="text-sm">
                    {new Date(issue.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </strong>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {comment.body}
                  </p>
                </div>
              ))}
          </section>
        </div>
      </main>
      <footer className="flex flex-col items-center justify-between space-y-4 bg-zinc-200/40 px-6 py-4 dark:bg-zinc-800/40">
        <AddComment issueId={issueId} />
      </footer>
    </div>
  );
}
