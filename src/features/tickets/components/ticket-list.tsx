// import { prisma } from "@/lib/prisma";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";
// import { SearchInput } from "@/components/search-input";
import { ParsedSearchParams } from "../search-params";
import { Placeholder } from "@/components/placeholder";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";
import { TicketPagination } from "./ticket-pagination";
// import { SortSelect } from "@/components/sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  // const resolvedSearchParams = await Promise.resolve(searchParams);
  const { list: tickets, metadata: ticketMetadata } = await getTickets(
    userId,
    searchParams
  );
  // const tickets = await prisma.ticket.findMany();

  return (
    <div className="flex-1 flex flex-col items-center space-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <TicketSearchInput placeholder="Search tickets ..." />
        <TicketSortSelect
          options={[
            {
              sortKey: "createdAt",
              sortValue: "desc",
              label: "Newest",
            },
            {
              sortKey: "createdAt",
              sortValue: "asc",
              label: "Oldest",
            },
            {
              sortKey: "bounty",
              sortValue: "desc",
              label: "Bounty",
            },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}

      <div className="w-full max-w-[420px]">
        {/* <TicketPagination paginatedTicketMetadata={ticketMetadata} /> */}
        <TicketPagination paginatedTicketMetadata={ticketMetadata} />
      </div>
    </div>
  );
};

export { TicketList };
