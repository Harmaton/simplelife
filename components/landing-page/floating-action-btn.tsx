"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";

const FloatingActionButton: React.FC = () => {
  const redirectToWhatsApp = () => {
    const phoneNumber = "+59170133430";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.location.href = whatsappUrl;
  };

  return (
    <Button
      onClick={redirectToWhatsApp}
      className="fixed bottom-12 right-12 bg-green-500 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-full shadow-lg"
      style={{
        zIndex: 999,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
      }}
      data-aos="fade-left"
    >
      <FaWhatsapp className="m-auto h-6 w-6" />
    </Button>
  );
};

export default FloatingActionButton;
