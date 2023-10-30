import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

function PriorityBadge({ priority }: { priority: number }) {
  let color, text;

  switch (priority) {
    case 1:
      color = "bg-red-600";
      text = "Urgent";
      break;
    case 2:
      color = "bg-orange-600";
      text = "High";
      break;
    case 3:
      color = "bg-yellow-600";
      text = "Normal";
      break;
    case 4:
      color = "bg-green-600";
      text = "Low";
      break;
    default:
      color = "bg-gray-600";
      text = "No";
  }

  return (
    <span
      className={`inline-block w-fit whitespace-nowrap rounded-full px-2 text-sm font-medium text-white ${color}`}
    >
      {text} Priority
    </span>
  );
}

function truncate(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export default function IssueCard({
  id,
  title,
  description,
  priority,
}: {
  id: string;
  title: string;
  description?: string;
  priority?: number;
}) {
  return (
    <Link href={`/issue/${id}`} target="_blank">
      <Card className="h-full max-w-lg cursor-pointer shadow-sm hover:shadow-md">
        <CardHeader>
          <div className="justify-center-center flex flex-col gap-2">
            <CardTitle>{title}</CardTitle>
            {priority !== undefined && <PriorityBadge priority={priority} />}
          </div>
          <CardDescription className="overflow-hidden">
            {description ? (
              truncate(description, 200)
            ) : (
              <i>No Description...</i>
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
