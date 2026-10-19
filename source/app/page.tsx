import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  FileCheck2,
  Mail,
  Settings2,
  Wrench,
  Workflow,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: Workflow,
    label: "01",
    title: "Business Operations",
    description:
      "Practical support for the work behind the work—process documentation, coordination, reporting, and day-to-day administrative systems.",
    outcomes: ["Process notes", "Handoff checklists", "Practical coordination"],
  },
  {
    icon: Wrench,
    label: "02",
    title: "Technology Support",
    description:
      "Straightforward setup, troubleshooting, cloud-service configuration, and lightweight workflow improvements without unnecessary complexity.",
    outcomes: ["Configured systems", "Issue documentation", "Workflow improvements"],
  },
  {
    icon: Boxes,
    label: "03",
    title: "Additive Manufacturing / 3D Printing",
    description:
      "Design preparation, project-based prototyping, and custom prints for reviewed, non-safety-critical applications.",
    outcomes: ["Prepared models", "Prototype iterations", "Request-based prints"],
  },
];

const steps = [
  {
    number: "01",
    title: "Understand the need",
    description:
      "Start with the problem, desired outcome, customer inputs, constraints, and what success should look like.",
  },
  {
    number: "02",
    title: "Define the scope",
    description:
      "Set the deliverables, responsibilities, and next steps. Any expansion is confirmed before the scope changes.",
  },
  {
    number: "03",
    title: "Deliver and document",
    description:
      "Deliver the agreed scope, explain what changed, and leave behind information that remains useful after handoff.",
  },
];

const principles = [
  {
    icon: Settings2,
    title: "Right-sized solutions",
    description: "Enough structure to solve the problem—without building overhead you do not need.",
  },
  {
    icon: CheckCircle2,
    title: "Defined outcomes",
    description: "Clear expectations, direct communication, and deliverables that can be checked.",
  },
  {
    icon: FileCheck2,
    title: "Documented handoff",
    description: "The work should remain understandable and usable after the project is complete.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand-link" href="#top" aria-label="AP3X Operations LLC — home">
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
            <a href="#services">Services</a>
            <a href="#process">How we work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <a
            className="header-contact"
            href="mailto:sebastien@ap3xoperations.com?subject=AP3X%20project%20inquiry"
          >
            Discuss a project
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-heading">
          <Image
            className="hero-background hero-background-wide"
            src="/ap3x-hero.webp"
            alt=""
            aria-hidden="true"
            width={2400}
            height={900}
            sizes="100vw"
            priority
          />
          <Image
            className="hero-background hero-background-portrait"
            src="/ap3x-mobile.webp"
            alt=""
            aria-hidden="true"
            width={1080}
            height={1350}
            sizes="100vw"
          />
          <div className="hero-overlay" aria-hidden="true" />

          <div className="shell hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span aria-hidden="true" />
                Operations · Technology · Additive Manufacturing
              </p>
              <h1 id="hero-heading">Practical support for work that needs to move.</h1>
              <p className="hero-summary">
                AP3X helps small businesses and project teams organize day-to-day
                operations, solve technology problems, and turn digital designs into
                functional 3D-printed parts.
              </p>

              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href="mailto:sebastien@ap3xoperations.com?subject=AP3X%20project%20inquiry"
                >
                  Discuss a project
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="button button-secondary" href="#services">
                  Explore services
                </a>
              </div>

              <ul className="hero-proof" aria-label="How AP3X works" role="list">
                <li>Owner-led</li>
                <li>Scope-defined</li>
                <li>Documented handoff</li>
              </ul>
            </div>

          </div>
        </section>

        <section className="section services-section" id="services" aria-labelledby="services-heading">
          <div className="shell">
            <div className="section-intro">
              <p className="section-kicker">What AP3X does</p>
              <h2 id="services-heading">Three service lines. One practical partner.</h2>
              <p>
                Support can be focused on one defined task or structured around a broader
                project. The work stays tied to a concrete need and a usable outcome.
              </p>
            </div>

            <div className="service-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className="service-card" key={service.title}>
                    <div className="card-topline">
                      <span className="icon-box">
                        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="card-number">{service.label}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul role="list">
                      {service.outcomes.map((outcome) => (
                        <li key={outcome}>
                          <CheckCircle2 size={15} aria-hidden="true" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section process-section" id="process" aria-labelledby="process-heading">
          <div className="shell process-layout">
            <div className="process-heading-wrap">
              <p className="section-kicker">How we work</p>
              <h2 id="process-heading">Clear from first question to final handoff.</h2>
              <p>
                Every engagement starts with the actual requirement—not a predetermined
                package or a stack of unnecessary tools.
              </p>
            </div>

            <ol className="process-list" role="list">
              {steps.map((step) => (
                <li key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-heading">
          <div className="shell">
            <div className="about-panel">
              <div className="about-copy">
                <p className="section-kicker">About AP3X</p>
                <h2 id="about-heading">Capability without unnecessary ceremony.</h2>
                <p>
                  AP3X Operations LLC is an owner-led service business built around a
                  simple idea: useful work should be organized, understandable, and
                  delivered with care. That applies whether the project is a workflow,
                  a technology problem, or a physical part.
                </p>
              </div>

              <div className="principles-grid">
                {principles.map((principle) => {
                  const Icon = principle.icon;
                  return (
                    <article key={principle.title}>
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                      <h3>{principle.title}</h3>
                      <p>{principle.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="shell">
            <div className="contact-panel">
              <div>
                <p className="section-kicker">Start a conversation</p>
                <h2 id="contact-heading">Tell us what you are working on.</h2>
                <p>
                  Share the problem, the desired outcome, and your timing. AP3X will
                  respond with the next practical step.
                </p>
              </div>
              <div className="contact-actions">
                <a
                  className="button button-primary contact-button"
                  href="mailto:sebastien@ap3xoperations.com?subject=AP3X%20project%20inquiry"
                >
                  <Mail size={18} aria-hidden="true" />
                  Start a conversation
                </a>
                <a className="contact-email" href="mailto:sebastien@ap3xoperations.com">
                  sebastien@ap3xoperations.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

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
            <span>Franklin, NY · Remote anywhere</span>
          </div>
        </div>
      </footer>

    </>
  );
}
