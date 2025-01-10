"use client";

import { Placeholder } from "@/components/placeholder";

export default function Error({ error }: { error: Error }) {
  return <Placeholder label={error.message || "Someting went wrong!"} />;
}
