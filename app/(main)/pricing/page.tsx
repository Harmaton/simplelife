'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from '@/components/landing-page/navbar'

const pricingData = {
  packs: [
    { title: "Basic", price: "$9.99", features: ["Feature 1", "Feature 2", "Feature 3"] },
    { title: "Pro", price: "$19.99", features: ["All Basic features", "Feature 4", "Feature 5"] },
    { title: "Enterprise", price: "$29.99", features: ["All Pro features", "Feature 6", "Feature 7"] },
  ],
  certifications: [
    { title: "Beginner", price: "$49.99", features: ["Certification 1", "Certification 2"] },
    { title: "Intermediate", price: "$79.99", features: ["Certification 3", "Certification 4"] },
    { title: "Advanced", price: "$99.99", features: ["Certification 5", "Certification 6"] },
  ],
  fullAccess: [
    { title: "Monthly", price: "$39.99/month", features: ["Full access to all courses", "24/7 support"] },
    { title: "Yearly", price: "$399.99/year", features: ["Full access to all courses", "24/7 support", "2 months free"] },
  ]
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("packs")

  const PriceComponent = ({ title, price, features }: { title: string; price: string; features: string[] }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-2xl font-bold mb-4">{price}</p>
      <ul className="list-disc list-inside">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <div className="bg-background py-12 mb-8 text-center font-serif">
        <h1 className="text-4xl font-bold mb-4">Precios</h1>
        <p className="text-lg">Elige el plan que mejor se adapte a ti</p>
      </div>

      <Tabs defaultValue="packs" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger 
            value="packs" 
            className={activeTab === "packs" ? "bg-background" : ""}
            onClick={() => setActiveTab("packs")}
          >
            Packs
          </TabsTrigger>
          <TabsTrigger 
            value="certifications" 
            className={activeTab === "certifications" ? "bg-background" : ""}
            onClick={() => setActiveTab("certifications")}
          >
            Certifications
          </TabsTrigger>
          <TabsTrigger 
            value="fullAccess" 
            className={activeTab === "fullAccess" ? "bg-background" : ""}
            onClick={() => setActiveTab("fullAccess")}
          >
            Full Access
          </TabsTrigger>
        </TabsList>
        <TabsContent value="packs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingData.packs.map((pack, index) => (
              <PriceComponent key={index} {...pack} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="certifications">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingData.certifications.map((cert, index) => (
              <PriceComponent key={index} {...cert} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="fullAccess">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingData.fullAccess.map((access, index) => (
              <PriceComponent key={index} {...access} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
