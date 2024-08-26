"use client";

import { useState, FormEvent } from "react";
import {
  CheckIcon,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing-page/navbar";
import { Footer } from "@/components/landing-page/footer";
import ContactFormNew from "./contact-form";
import Top from "@/components/top-page";

const variants = {
  hidden: { opacity: 0, x: "-100vw" },
  visible: { opacity: 1, x: 0 },
};

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="p-6 font-serif">
        <Top header="Contacta con nosotras" text=" ¿Alguna pregunta o comentario? Sólo escríbenos un mensaje" />

        <div className="flex flex-col  space-y-4 md:space-y-0 md:flex-row p-4">
          <div className="md:w-1/3 p-4 flex justify-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ type: "spring", stiffness: 120 }}
              className="card shadow-lg p-6 m-2  rounded-xl space-y-4 w-full  flex flex-col justify-between"
            >
              <div className="text-center mb-4">
                {" "}
                {/* Added margin-bottom for spacing */}
                <h2 className="text-2xl font-bold">Ponerse en contacto</h2>
                <h3 className="text-lg font-semibold">
                  Estamos aquí para ayudarte
                </h3>
              </div>

              <div className="space-y-2 mb-4">
                {" "}
                {/* Added space-y for vertical spacing between p tags and margin-bottom for spacing */}
                <p>
                  <span className="font-semibold">El mail es:</span>{" "}
                  hola@simplelifeofficial.com
                </p>
                <p>
                  <span className="font-semibold">El teléfono es:</span> +54 9
                  3516 19-7304
                </p>
                <p>
                  <span className="font-semibold">La dirección es:</span>{" "}
                  Marcelo T. de Alvear 628. Córdoba - Argentina.
                </p>
              </div>

              <div className="flex justify-around mt-4">
                {" "}
                {/* Added margin-top for spacing */}
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-white"
                >
                  <Facebook />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-white"
                >
                  <Twitter />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-white"
                >
                  <Instagram />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-white"
                >
                  <Linkedin />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="md:w-2/3 p-2 ">
            <ContactFormNew />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
