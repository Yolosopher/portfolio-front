import Dashboard from "@/components/admin/dashboard/Dashboard";
import { AnalyticsDataType } from "@/types";
import { revalidateTag } from "next/cache";

const AdminDashboard = async () => {
  // const analytics = await fetchAnalytics(AnalyticsDataType.STATS);

  // const refetch = async () => {
  //   "use server";
  //   revalidateTag("analytics" + AnalyticsDataType.STATS);
  // };
  return (
    <div className="container flex flex-col gap-3">
      <div className="relative mt-6 flex md:justify-center items-center mb-4">
        <h1 className="text-2xl md:text-4xl font-bold md:text-center text-left">
          Admin | Dashboard
        </h1>
      </div>
      <div className="flex gap-3 flex-col justify-center items-start">
        {/* <Dashboard refetch={refetch} analytics={analytics} /> */}
      </div>
    </div>
  );
};
export default AdminDashboard;
