import { Card } from "@/components/ui/card";

export default function IssueRow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-medium underline">{title}</h2>
      <Card className="l mb-2 mt-4 grid grid-cols-5 gap-4 overflow-x-scroll border-none p-4 shadow-none">
        {children}
      </Card>
    </div>
  );
}
