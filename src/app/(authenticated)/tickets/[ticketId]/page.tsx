import { Breadcrumbs } from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { TicketItem } from "@/features/tickets/components/ticket-item";
import { getTicket } from "@/features/tickets/queries/get-ticket";
import { homePath } from "@/path";
import { notFound } from "next/navigation";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params; // 解构并等待 params
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "诊断", href: homePath() },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  );
};

export default TicketPage;
