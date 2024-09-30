"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/landing-page/navbar";
import PackComponent from "./_components/pack-component";
import Top from "@/components/top-page";

const pricingData = {
  packs: [
    {
      id: 36,
      title: "Pack - Pruebas y Pruebas2",
      price: 3.90,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/S95700742Q",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 1,
      title: "Pack - Pack - Coaching y Desarrollo Cognitivo",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/R94010698T",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["1", "cdc001", "coach001"],
    },
    {
      id: 2,
      title: "Pack - Coaching y Terapia Holística ",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/R94010535I",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["2", "cth002", "holis001"],
    },
    {
      id: 3,
      title: "Pack - Coaching, Terapia Holística y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/G94028010L",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["3", "cthdc003", "premium001"],
    },
    {
      id: 4,
      title: "Pack - Crecimiento Personal y Coaching",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/X94010313Y",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["4", "cpc004", "growth001"],
    },
    {
      id: 5,
      title: "Pack - Crecimiento Personal y Desarrollo Cognitivo",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/H94010466G",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["5", "cpdc005", "cogdev001"],
    },
    {
      id: 6,
      title: "Pack - Crecimiento Personal y Terapia Holística",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/V94010390Q",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["6", "cpth006", "holistic001"],
    },
    {
      id: 7,
      title: "Pack - Crecimiento Personal, Coaching y Terapia Holística",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/X94027767I",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["7", "cpcth007", "allround001"],
    },
    {
      id: 8,
      title: "Pack - Crecimiento Personal, Terapia Holística y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/N94027925X",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["8", "cpthdc008", "complete001"],
    },
    {
      id: 9,
      title: "Pack - Espiritualidad y Coaching",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/O94009982C",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["9", "ec009", "spirit001"],
    },
    {
      id: 10,
      title: "Pack - Espiritualidad y Crecimiento Personal",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/K94009863I",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["10", "ecp010", "spiritgrowth001"],
    },
    {
      id: 11,
      title: "Pack - Espiritualidad y Desarrollo Cognitivo",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/I94010172J",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["11", "edc011", "spiritcog001"],
    },
    {
      id: 12,
      title: "Pack - Espiritualidad y Terapia Holística ",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/U94010077V",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["12", "eth012", "spirithol001"],
    },
    {
      id: 13,
      title: "Pack - Espiritualidad, Coaching y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/K94027522H",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["13", "ecdc013", "spiritcoachcog001"],
    },
    {
      id: 14,
      title: "Pack - Espiritualidad, Coaching y Terapia Holística",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/H94027462N",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["14", "ecth014", "spiritcoachhol001"],
    },
    {
      id: 15,
      title: "Pack - Espiritualidad, Crecimiento Personal y Coaching",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/R94027249S",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["15", "ecpc015", "spiritgrowthcoach001"],
    },
    {
      id: 16,
      title: "Pack - Espiritualidad, Crecimiento Personal y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/C94027387I",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["16", "ecpdc016", "spiritgrowthcog001"],
    },
    {
      id: 17,
      title: "Pack - Espiritualidad, Crecimiento Personal y Terapia Holística",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/F94027333Y",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["17", "ecpth017", "spiritgrowthhol001"],
    },
    {
      id: 18,
      title: "Espiritualidad, Terapia Holística y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/B94027576E",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["18", "ethdc018", "spiritholcog001"],
    },
    {
      id: 19,
      title: "Pack - Psicología y Coaching",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/Q94009321B",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["19", "pc019", "psychcoach001"],
    },
    {
      id: 20,
      title: "Pack - Psicología y Crecimiento Personal",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/L94009221V",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["20", "pcp020", "psychgrowth001"],
    },
    {
      id: 21,
      title: "Pack - Psicología y Desarrollo Cognitivo",
      price: 118.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/Q94009701S",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["21", "pdc021", "psychcog001"],
    },
    {
      id: 22,
      title: "Pack - Psicología y Espiritualidad",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/G94009104J",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 23,
      title: "Pack - Psicología y Terapia Holística ",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/C94009500E",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["23", "pth023", "psychhol001"],
    },
    {
      id: 24,
      title: "Pack - Psicología, Coaching y Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/D94027014X",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["24", "pcdc024", "psychcoachcog001"],
    },
    {
      id: 25,
      title: "Pack - Psicología, Coaching y Terapia Holística",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/M94026934B",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 26,
      title: "Pack - Psicología, Crecimiento Personal y Coaching",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/A94026550R",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 27,
      title: "Pack - Psicología, Crecimiento Personal y Terapia Holística",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/Q94026796E",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 28,
      title: "Pack - Psicología, Crecimiento Personal y Desarollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/Q94026874J",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 29,
      title: "Pack - Psicología, Espiritualidad y Crecimiento Personal",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/M94011038C",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 30,
      title: "Pack - Psicología, Espiritualidad y Coaching",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/D94011161M",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 31,
      title: "Pack - Psicología, Espiritualidad y Terapia Holística",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/K94011314I",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 32,
      title: "Pack - Psicología, Espiritualidad y Desarollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/W94011374M",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 33,
      title: "Pack - Terapia Holística y Desarrollo Cognitivo",
      price: 188.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/J94028774X",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 34,
      title: "Pack - Crecimiento Personal, Coaching y  Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/I94027857Q",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
    {
      id: 35,
      title: "Pack - Psicología, Terapia Holística y  Desarrollo Cognitivo",
      price: 225.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/U94027105P",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
  ],

  certifications: [
    {
      id: 1,
      title: "Pack - Terapia Holística",
      price: 125.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/C94008841M",
      features: [
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["1", "beg001", "cert001"],
    },
    {
      id: 2,
      title: "Pack - Crecimiento Personal",
      price: 125.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/Y94008157F",
      features: [
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["2", "int002", "cert002"],
    },
    {
      id: 3,
      title: "Pack -Psicología",
      price: 125.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/C94007377M",
      features: [
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["3", "adv003", "cert003"],
    },
    {
      id: 4,
      title: "Pack - Espiritualidad",
      price: 125.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/G94008008A",
      features: [
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["1", "beg001", "cert001"],
    },
    {
      id: 5,
      title: "Pack - Desarrollo Cognitivo",
      price: 125.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/X94008903T",
      features: [
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["2", "int002", "cert002"],
    },
    {
      id: 6,
      title: "Pack - Coaching",
      price: 125.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/A94008694S",
      features: [
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["3", "adv003", "cert003"],
    },
     {
      id: 7,
      title: "Pack - Pruebas",
      price: 3.90,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/B95621277W",
      features: [
        { id: 1, name: "Acceso a 10 cursos" },
        { id: 2, name: "Soporte comunitario básico" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
      ],
      ids: ["22", "pe022", "psychspirit001"],
    },
  ],

  fullAccess: [
    {
      id: 1,
      title: "Membresía Anual",
      price: 1099.0,
      imageUrl: "/logo-1.png",
      link: "https://pay.hotmart.com/B86756318T",
      features: [
        { id: 1, name: "Acceso a todos los cursos y packs" },
        { id: 2, name: "Soporte premium" },
        { id: 3, name: "Webinars mensuales" },
        { id: 4, name: "Aprendizaje a tu propio ritmo" },
        { id: 5, name: "Inclusión en el Programa Avanzado" }        
      ],
      ids: ["1", "cdc001", "coach001"],
    },
  ],
};

export default function Page() {
  const [activeTab, setActiveTab] = useState("packs");
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <Top header="Precios" text="Elige el plan que mejor se adapte a ti" />

        <Tabs defaultValue="packs" className="mb-10">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="packs"
              className={activeTab === "packs" ? "bg-background" : ""}
              onClick={() => setActiveTab("packs")}
            >
              <div className="flex items-center space-x-2">
                <span>Paquetes</span>
                <span className="bg-red-500 text-white text-xs px-2 rounded-full ">
                  Nueva !
                </span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="certifications"
              className={activeTab === "certifications" ? "bg-background" : ""}
              onClick={() => setActiveTab("certifications")}
            >
              <div className="flex items-center space-x-2">
                <span> Certificaciones</span>
                <span className="bg-red-500 text-white text-xs px-2 rounded-full ">
                  Nueva !
                </span>
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
  );
}
