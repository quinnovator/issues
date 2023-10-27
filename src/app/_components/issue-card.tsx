import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
      className={`inline-block rounded-full px-2 text-sm font-medium text-white ${color}`}
    >
      {text} Priority
    </span>
  );
}

export default function IssueCard({
  title,
  description,
  priority,
}: {
  title: string;
  description?: string;
  priority?: number;
}) {
  return (
    <Card className="max-w-md cursor-pointer shadow-sm hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-1">
          <CardTitle>{title}</CardTitle>
          {priority !== undefined && <PriorityBadge priority={priority} />}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
