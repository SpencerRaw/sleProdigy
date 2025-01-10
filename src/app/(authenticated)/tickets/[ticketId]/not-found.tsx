import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/path";
import Link from "next/link";

export default function NotFound() {
  return (
    <Placeholder
      label="没有诊断"
      button={
        <Button asChild variant={"outline"}>
          <Link href={ticketsPath()}>Go to Tickets</Link>
        </Button>
      }
    />
  );
}
