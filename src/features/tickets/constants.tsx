import { LucideCheckCircle, LucideFileText, LucidePencil } from "lucide-react";

export const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  DONE: <LucideCheckCircle />,
  IN_PROGRESS: <LucidePencil />,
};

export const TICKET_STATUS_LABELS = {
  OPEN: "待诊",
  DONE: "已完成",
  IN_PROGRESS: "诊断中",
};
