import { redirect } from "next/navigation";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { auth } from "@/firebase";
import { getAnalytics } from "@/app/actions/analytics";

const AnalyticsPage = async () => {
  const user = auth.currentUser;
  const userId = user?.uid;

  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Los ingresos totales"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard label="Ventas totales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;