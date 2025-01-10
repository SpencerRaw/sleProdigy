import { Breadcrumbs } from "@/components/breadcrumb";
import { CardCompact } from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketUpsertForm } from "@/features/tickets/components/ticket-upsert-form";
import { getTicket } from "@/features/tickets/queries/get-ticket";
import { homePath, ticketPath } from "@/path";
import { notFound } from "next/navigation";

type TicketEditPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  // const { user } = await getAuth();
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;
  // const isTicketOwner = isOwner(user, ticket);

  // if (!isTicketFound || !isTicketOwner) {
  //   notFound();
  // }
  if (!isTicketFound || !ticket.isOwner) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "所有诊断", href: homePath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: "修改" },
        ]}
      />

      <Separator />
      <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact
          title="修改诊断"
          description="编辑现有的诊断记录"
          className="w-full max-w-[420px] animate-fade-in-from-top"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
};

export default TicketEditPage;
