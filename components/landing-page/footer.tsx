import Link from "next/link";

import Image from "next/image";
import NewsletterBackground from "./newsletter";
import { siteConfig } from "@/config/site";
import { Shell } from "../shells/shell";

export function Footer() {
  return (
    <footer className="w-full border-t bg-white mr-6 ml-6 rounded-md ">
      <Shell as="div">
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20 "
        >
          <section
            id="footer-branding"
            aria-labelledby="footer-branding-heading"
            className="justify-center items-center flex"
          >
            <Link
              aria-label="Home"
              href="/"
              className="flex items-center space-x-2"
            >
              <Image src="/v_logo.png" alt="Logo" width={200} height={200} />
            </Link>
          </section>
          <section
            id="footer-links"
            aria-labelledby="footer-links-heading"
            className="grid flex-1 grid-cols-2 gap-10 xs:grid-cols-2 sm:grid-cols-3 mx-2"
          >
            {siteConfig.footerNav.map((item) => (
              <div key={item.title} className="space-y-3">
                <h4 className="text-base font-medium">{item.title}</h4>
                <ul className="space-y-3">
                  {item.items.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link?.external ? "_blank" : undefined}
                        rel={link?.external ? "noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </section>
        {/* <Separator /> */}
        <NewsletterBackground />
        <section className="text-center p-3 items-center">
          <p className="text-sm text-muted-foreground">
            Derechos de autor &copy; {new Date().getFullYear()} SimpleLife
          </p>
        </section>
      </Shell>
    </footer>
  );
}
