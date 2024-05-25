import {
  AlarmClockCheck,
  ArrowBigDown,
  ArrowBigRight,
  ArrowBigUp,
  CircleCheck,
  CircleHelp,
  CircleX,
  Loader,
} from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: CircleHelp,
  },
  {
    value: "todo",
    label: "Todo",
    icon: AlarmClockCheck,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Loader,
  },
  {
    value: "done",
    label: "Done",
    icon: CircleCheck,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleX,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowBigDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowBigRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowBigUp,
  },
];
