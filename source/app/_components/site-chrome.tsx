import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "./contact-form";

type NavKey = "services" | "printing" | "about" | "contact";

const navItems: { key: NavKey; href: string; label: string }[] = [
  { key: "services", href: "/#services", label: "Services" },
  { key: "printing", href: "/printing/", label: "3D printing" },
  { key: "about", href: "/about/", label: "About" },
  { key: "contact", href: "#contact", label: "Contact" },
];

// Every "discuss a project" button scrolls to the contact form on the current page.
export const inquiryHref = "#contact";

export function SkipLink() {
  return (
    <a className="skip-link" href="#main-content">
      Skip to main content
    </a>
  );
}

export function SiteHeader({ current }: { current?: NavKey }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand-link" href="/#top" aria-label="AP3X Operations LLC — home">
          <Image
            className="brand-logo"
            src="/brand/ap3x-logo-horizontal-reversed.webp"
            alt=""
            width={800}
            height={220}
            priority
          />
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              aria-current={current === item.key ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-contact" href={inquiryHref}>
          Discuss a project
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="footer-brand">
          <Image
            className="footer-logo"
            src="/brand/ap3x-logo-horizontal-reversed.webp"
            alt="AP3X Operations LLC"
            width={800}
            height={220}
          />
        </div>
        <div className="footer-meta">
          <a href="mailto:sebastien@ap3xoperations.com">sebastien@ap3xoperations.com</a>
          <span>© 2026 AP3X Operations LLC</span>
          <span>Based in Franklin, NY. Available for remote work anywhere.</span>
        </div>
      </div>
    </footer>
  );
}

export function ContactPanel({
  kicker,
  heading,
  body,
  defaultTopic,
}: {
  kicker: string;
  heading: string;
  body: string;
  defaultTopic?: string;
}) {
  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="shell">
        <div className="contact-panel">
          <div>
            <p className="section-kicker">{kicker}</p>
            <h2 id="contact-heading">{heading}</h2>
            <p>{body}</p>
          </div>
          <ContactForm defaultTopic={defaultTopic} />
        </div>
      </div>
    </section>
  );
}
