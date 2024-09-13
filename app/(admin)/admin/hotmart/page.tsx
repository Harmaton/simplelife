import React from 'react'
import { GridCard } from './_components/grid-card'
import { Clipboard, Globe, Truck, Users } from 'lucide-react';
import { DataTable } from './_components/data-table';

export default function Page() {
    const cards = [
        {
          icon: <Clipboard size={24} />,
          title: "Total Orders",
          value: "10.580",
          change: 20,
          lastMonthTotal: "9.450",
          isIncrease: true
        },
        {
          icon: <Globe size={24} />,
          title: "Views Product",
          value: "2.234",
          change: 20,
          lastMonthTotal: "2.450",
          isIncrease: false
        },
        {
          icon: <Truck size={24} />,
          title: "Total Delivery",
          value: "11.250",
          change: 20,
          lastMonthTotal: "12.450",
          isIncrease: false
        },
        {
          icon: <Users size={24} />,
          title: "Total Customers",
          value: "24.805",
          change: 20,
          lastMonthTotal: "9.450",
          isIncrease: true
        }
      ];
  return (
    <div className="container mx-auto px-4 py-8">
        <div className='p-2 flex flex-col space-y-2'>
        <h1 className='font-bold text-2xl'>Integración con Hotmart</h1>
        <p className='font-sm font-mono'>Los datos de Hotmart se actualizan aquí automáticamente cada 5 minutos</p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {cards.map((card, index) => (
          <GridCard key={index} {...card} />
        ))}
      </div>
      {/* Placeholder for the table that will appear below */}
      <div className="mt-6 p-4">
        <h2 className="text-lg font-semibold mb-2">Tabla de compras</h2>
        <DataTable columns={[]} data={[]} />
      </div>
    </div>
  )
}
