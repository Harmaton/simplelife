import { motion } from "framer-motion";
import Link from "next/link";

export const Logo = () => {
    return (
      <Link
        href="/"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      >
        <motion.img
          src="/logo-1.png"
          alt="Logo"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
      </Link>
    );
  };
  export const LogoIcon = () => {
    return (
      <Link
        href="/"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      >
        <motion.img
          src="/logo-1.png"
          alt="Logo"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
      </Link>
    );
  };