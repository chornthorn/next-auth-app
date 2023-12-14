import PositionTable, {
  IPosition,
} from "@/app/(master)/positions/position-table";
import PositionForm from "@/app/(master)/positions/position-form";
import { httpClient } from "@/libs/axios";

async function getPositions() {
  const response = await httpClient.get("/positions");
  return response.data;
}

const Page = async () => {
  const response = await getPositions();
  const data: IPosition[] = response.data;

  return (
    <div>
      <h1>Positions</h1>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-4 mb-10 w-96">
          <PositionForm />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-4 mx-20 mt-10">
        <PositionTable data={data} />
      </div>
    </div>
  );
};

export default Page;
