import { Button } from "@/components/ui/button";
import Community from "@/components/CommunityMedia";

function page() {
  return (
    <section className="h-full w-full flex flex-col overflow-y-scroll px-3">
      <div className="search-box w-full py-3 flex items-center space-x-3">
        <input
          type="text"
          className="grow px-2 py-1 rounded-md"
          placeholder="Cari sesuatu..."
        />
        <Button className="rounded-full" size="icon">
          H
        </Button>
      </div>

      <div className="all-media w-full">
        <Community />
      </div>
    </section>
  );
}

export default page;
