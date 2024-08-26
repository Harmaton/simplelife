'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from '@/components/landing-page/navbar'
import PackComponent from './_components/pack-component'
import Top from '@/components/top-page'


const pricingData = {
  packs: [
    {
      id: 1,
      title: "Coaching y Desarrollo Cognitivo",
      price: 188.00,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/R94010698T',
      features: [
        { id: 1, name: "Access to 10 courses" },
        { id: 2, name: "Basic community support" },
        { id: 3, name: "Monthly webinars" },
        { id: 4, name: "Self-paced learning" },
      ],
      ids: ["1", "cdc001", "coach001"],
    },
    {
      id: 2,
      title: "Coaching y Terapia Holística ",
      price: 188.00,
      imageUrl: "/logo-1.png",
      link: 'https://go.hotmart.com/R94010535I',
      features: [
        { id: 1, name: "Access to 50 courses" },
        { id: 2, name: "Priority community support" },
        { id: 3, name: "Weekly webinars" },
        { id: 4, name: "1-on-1 mentoring session" },
      ],
      ids: ["2", "cth002", "holis001"],
    },
    {
      id: 3,
      title: "Coaching, Terapia Holística y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/G94028010L',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["3", "cthdc003", "premium001"],
    },
    {
      id: 4,
      title: "Crecimiento Personal y Coaching",
      price: 188.00,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/X94010313Y',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["4", "cpc004", "growth001"],
    },
    {
      id: 5,
      title: "Crecimiento Personal y Desarrollo Cognitivo",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/H94010466G',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["5", "cpdc005", "cogdev001"],
    },
    {
      id: 6,
      title: "Crecimiento Personal y Terapia Holística",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/V94010390Q',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["6", "cpth006", "holistic001"],
    },
    {
      id: 7,
      title: "Crecimiento Personal, Coaching y Terapia Holística",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/X94027767I',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["7", "cpcth007", "allround001"],
    },
    {
      id: 8,
      title: "Crecimiento Personal, Terapia Holística y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/N94027925X',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["8", "cpthdc008", "complete001"],
    },
    {
      id: 9,
      title: "Espiritualidad y Coaching",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/O94009982C',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["9", "ec009", "spirit001"],
    },
    {
      id: 10,
      title: "Espiritualidad y Crecimiento Personal",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/K94009863I',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["10", "ecp010", "spiritgrowth001"],
    },
    {
      id: 11,
      title: "Espiritualidad y Desarrollo Cognitivo",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/I94010172J',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["11", "edc011", "spiritcog001"],
    },
    {
      id: 12,
      title: "Espiritualidad y Terapia Holística ",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/U94010077V',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["12", "eth012", "spirithol001"],
    },
    {
      id: 13,
      title: " Espiritualidad, Coaching y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/K94027522H',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["13", "ecdc013", "spiritcoachcog001"],
    },
    {
      id: 14,
      title: "Espiritualidad, Coaching y Terapia Holística",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/H94027462N',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["14", "ecth014", "spiritcoachhol001"],
    },
    {
      id: 15,
      title: "Espiritualidad, Crecimiento Personal y Coaching",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/R94027249S',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["15", "ecpc015", "spiritgrowthcoach001"],
    },
    {
      id: 16,
      title: "Espiritualidad, Crecimiento Personal y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/C94027387I',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["16", "ecpdc016", "spiritgrowthcog001"],
    },
    {
      id: 17,
      title: "Espiritualidad, Crecimiento Personal y Terapia Holística",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/F94027333Y',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["17", "ecpth017", "spiritgrowthhol001"],
    },
    {
      id: 18,
      title: "Espiritualidad, Terapia Holística y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/B94027576E',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["18", "ethdc018", "spiritholcog001"],
    },
    {
      id: 19,
      title: "Psicología y Coaching",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/Q94009321B',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["19", "pc019", "psychcoach001"],
    },
    {
      id: 20,
      title: "Psicología y Crecimiento Personal",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/L94009221V',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["20", "pcp020", "psychgrowth001"],
    },
    {
      id: 21,
      title: "Psicología y Desarrollo Cognitivo",
      price: 118.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/Q94009701S',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["21", "pdc021", "psychcog001"],
    },
    {
      id: 22,
      title: "Psicología y Espiritualidad",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/G94009104J',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 23,
      title: "Psicología y Terapia Holística ",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/C94009500E',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["23", "pth023", "psychhol001"],
    },
    {
      id: 24,
      title: "Psicología, Coaching y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/D94027014X',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["24", "pcdc024", "psychcoachcog001"],
    },
    {
      id: 25,
      title: "Psicología, Coaching y Terapia Holística",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/M94026934B',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },

      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 26,
      title: "Psicología, Crecimiento Personal y Coaching",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/A94026550R',
      features: [
        { id: 1, name: "Access to all courses" },
        { id: 2, name: "24/7 premium support" },
        { id: 3, name: "Daily expert sessions" },
        { id: 4, name: "Custom learning paths" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
  ],
  certifications: [
    {
      id: 1,
      title: "Terapia Holística",
      price: 125.00,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/C94008841M',
      features: [
        { id: 1, name: "Certification 1" },
        { id: 2, name: "Certification 2" },
      ],
      ids: ["1", "beg001", "cert001"],
    },
    {
      id: 2,
      title: "Crecimiento Personal",
      price: 125.00,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/Y94008157F',
      features: [
        { id: 1, name: "Certification 3" },
        { id: 2, name: "Certification 4" },
      ],
      ids: ["2", "int002", "cert002"],
    },
    {
      id: 3,
      title: "Psicología",
      price: 125.00,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/C94007377M',
      features: [
        { id: 1, name: "Certification 5" },
        { id: 2, name: "Certification 6" },
      ],
      ids: ["3", "adv003", "cert003"],
    },
    {
      id: 1,
      title: "Espiritualidad",
      price: 125.00,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/G94008008A',
      features: [
        { id: 1, name: "Certification 1" },
        { id: 2, name: "Certification 2" },
      ],
      ids: ["1", "beg001", "cert001"],
    },
    {
      id: 2,
      title: "Desarrollo Cognitivo",
      price: 125.00,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/X94008903T',
      features: [
        { id: 1, name: "Certification 3" },
        { id: 2, name: "Certification 4" },
      ],
      ids: ["2", "int002", "cert002"],
    },
    {
      id: 3,
      title: "Coaching",
      price: 125.00,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/A94008694S',
      features: [
        { id: 1, name: "Certification 5" },
        { id: 2, name: "Certification 6" },
      ],
      ids: ["3", "adv003", "cert003"],
    },
  ],
  fullAccess: [
    {
      id: 1,
      title: "Coaching y Desarrollo Cognitivo",
      price: 1099.00,
      imageUrl: "/logo-1.png",
      link: 'https://pay.hotmart.com/B86756318T',
      features: [
        { id: 1, name: "Access to 10 courses" },
        { id: 2, name: "Basic community support" },
        { id: 3, name: "Monthly webinars" },
        { id: 4, name: "Self-paced learning" },
      ],
      ids: ["1", "cdc001", "coach001"],
    }
  ]
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("packs")
  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4">
      {/* <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600 via-sky-600 to-indigo-600 py-12 mb-8 text-center font-serif text-white">
        <h1 className="text-4xl font-bold mb-4">Precios</h1>
        <p className="text-lg">Elige el plan que mejor se adapte a ti</p>
      </div> */}
      <Top header='Precios' text='Elige el plan que mejor se adapte a ti' />

      <Tabs defaultValue="packs" className="mb-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger 
            value="packs" 
            className={activeTab === "packs" ? "bg-background" : ""}
            onClick={() => setActiveTab("packs")}
          >
            <div className="flex items-center space-x-2">
              <span>Paquetes</span>
              <span className="bg-red-500 text-white text-xs px-2 rounded-full ">Nueva !</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="certifications" 
            className={activeTab === "certifications" ? "bg-background" : ""}
            onClick={() => setActiveTab("certifications")}
          >
          
           <div className="flex items-center space-x-2">
              <span> Certificaciones</span>
              <span className="bg-red-500 text-white text-xs px-2 rounded-full ">Nueva !</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="fullAccess" 
            className={activeTab === "fullAccess" ? "bg-background" : ""}
            onClick={() => setActiveTab("fullAccess")}
          >
            Membresía Anual
          </TabsTrigger>
        </TabsList>
        <TabsContent value="packs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingData.packs.map((pack) => (
              <PackComponent key={pack.id} {...pack} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="certifications">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingData.certifications.map((cert) => (
              <PackComponent key={cert.id} {...cert} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="fullAccess">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingData.fullAccess.map((access) => (
              <PackComponent key={access.id} {...access} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </>
  )
}
