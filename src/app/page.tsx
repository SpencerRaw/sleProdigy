import { Heading } from "@/components/heading";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/tickets/components/ticket-list";
import { SearchParams } from "nuqs/server";
import { searchParamsCache } from "@/features/tickets/search-params";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />

      <Suspense fallback={<Spinner />}>
        <TicketList
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </div>
  );
};

export default HomePage;