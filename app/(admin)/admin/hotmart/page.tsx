import React from "react";
import { GridCard } from "./_components/grid-card";
import { Clipboard, Globe, Truck, Users } from "lucide-react";
import { DataTable } from "./_components/data-table";
import { getAllPurchases, getDashboardData } from "@/app/actions/purchases";
import { columns } from "./_components/columns";
import { FaMoneyBill } from "react-icons/fa";

export default async function Page() {
  const purchases = await getAllPurchases();
  const [ dashboardData] = await Promise.all([
    getDashboardData()
  ])
  // Calculate total delivery amount (sum of all prices)
  const totalDelivery = purchases.reduce((sum, purchase) => {
    return sum + (purchase.price || 0);
  }, 0);

  // Calculate unique clients (unique buyer emails)
  const uniqueClients = new Set(
    purchases.map((purchase) => purchase.buyerEmail)
  ).size;

  const cards = [
    {
      icon: <Clipboard size={24} />,
      title: "Pedidos totales",
      value: purchases.length.toString(),
      change: Math.round(dashboardData.orders.change),
      lastMonthTotal: "0",
      isIncrease: dashboardData.orders.change >= 0,
    },
    {
      icon: <Globe size={24} />,
      title: "Vistas del producto",
      value: "0",
      change: 20,
      lastMonthTotal: "0",
      isIncrease: false,
    },
    {
      icon: <FaMoneyBill size={24} />,
      title: "Entrega total",
      value: `$${totalDelivery.toFixed(2)}`,
      change: Math.round(dashboardData.totalDelivery.change),
      lastMonthTotal: "0",
      isIncrease: dashboardData.totalDelivery.change >= 0,
    },
    {
      icon: <Users size={24} />,
      title: "Total de clientes",
      value: uniqueClients.toString(),
      change: Math.round(dashboardData.clients.change),
      lastMonthTotal: dashboardData.clients.previous.toString(),
      isIncrease: dashboardData.clients.change >= 0,
    },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="p-2 flex flex-col space-y-2">
        <h1 className="font-bold text-2xl">Integración con Hotmart</h1>
        <p className="font-sm font-mono">
          Datos automáticos y modificados de Simplelife Hotmart
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {cards.map((card, index) => (
          <GridCard key={index} {...card} />
        ))}
      </div>
      {/* Placeholder for the table that will appear below */}
      <div className="mt-6 p-4">
        <h2 className="text-lg font-semibold mb-2">Tabla de compras</h2>
        <DataTable columns={columns} data={purchases} />
      </div>
    </div>
  );
}
