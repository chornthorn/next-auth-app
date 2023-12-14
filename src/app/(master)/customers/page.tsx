import { CardTitle } from "@/components/ui/card";
import PaginationTable from "@/components/pagination-table";

const Page = () => {
  return (
    <>
      <div className="my-4">
        <CardTitle>All Customers</CardTitle>
      </div>
      <PaginationTable />
    </>
  );
};

export default Page;
