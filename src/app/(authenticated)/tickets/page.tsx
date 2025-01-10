import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";

import { TicketList } from "@/features/tickets/components/ticket-list";
import { TicketUpsertForm } from "@/features/tickets/components/ticket-upsert-form";
import { SearchParams } from "nuqs/server";
import { searchParamsCache } from "@/features/tickets/search-params";

import { Suspense } from "react";

type TicketsPageProps = {
  searchParams: Promise<SearchParams>;
};

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  const { user } = await getAuth();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My Tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created."
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList
          userId={user?.id}
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
