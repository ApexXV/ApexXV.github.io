import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found | AP3X Operations",
  robots: {
    index: false,
  },
};

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="section contact-section" aria-labelledby="not-found-heading">
        <div className="shell">
          <div className="contact-panel">
            <div>
              <p className="section-kicker">404</p>
              <h2 id="not-found-heading">That page is not here.</h2>
              <p>
                The address may be out of date, or the page may have moved. The
                homepage has everything AP3X currently offers.
              </p>
            </div>
            <div className="contact-actions">
              <a className="button button-primary contact-button" href="/">
                Back to the homepage
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="contact-email" href="mailto:sebastien@ap3xoperations.com">
                sebastien@ap3xoperations.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
