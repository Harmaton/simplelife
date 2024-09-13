import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
  
  // const analyticsData = await getAnalytics(userId);
  // const data = analyticsData?.data || [];
  // const totalRevenue = analyticsData?.totalRevenue || 0;
  // const totalSales = analyticsData?.totalSales || 0;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Los ingresos totales"
          value={500}
          shouldFormat
        />
        <DataCard label="Total Purchases" value={10} />
      </div>
      <Chart data={[{"name": "Certificaciones vendidas", total: 8},{"name": "Diplomas vendidos", total: 10}, {"name": "Cursos vendidos", total: 150}]} />
    </div>
  );
};

export default AnalyticsPage;
