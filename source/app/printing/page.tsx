import { Ban, CheckCircle2, FileInput, Layers, Printer, ScanSearch, Send } from "lucide-react";
import { pageMetadata } from "../_components/page-metadata";
import { ContactPanel, SiteFooter, SiteHeader, SkipLink } from "../_components/site-chrome";

export const metadata = pageMetadata({
  path: "/printing/",
  title: "3D Printing",
  description:
    "Custom 3D-printed parts, prototypes and fixtures from AP3X Operations in Franklin, NY. Printed on a Bambu Lab X1 Carbon in PLA, PETG and carbon-fiber PETG.",
});

const materials = [
  {
    name: "PLA and PLA Matte",
    use: "Everyday parts, organizers, fixtures, tags and signage. Clean finish in gloss or matte.",
    detail: "Full spectrum of colors in stock.",
  },
  {
    name: "PETG",
    use: "Tougher parts that need more impact and heat resistance than PLA.",
    detail: "Translucent available.",
  },
  {
    name: "PETG-CF",
    use: "Carbon-fiber-filled PETG for stiff, rigid parts such as brackets, mounts and jigs, with a matte textured finish.",
    detail: "For parts that must not flex.",
  },
];

const projects = [
  {
    title: "Fleet key tag system",
    description:
      "Twelve custom key tags, each holding three keys, plus a wall-mounted rack to hang them on. Designed so every set has a fixed, labelled place. About 9¾ hours of total print time.",
  },
  {
    title: "Equipment rack",
    description:
      "A custom-printed rack system for organizing network and infrastructure equipment, sized to the hardware it holds.",
  },
];

const steps = [
  {
    icon: Send,
    title: "Send the file or the idea",
    description:
      "Email a model file, a sketch, photos or measurements. If there is no model yet, describe what the part needs to do and where it fits.",
  },
  {
    icon: ScanSearch,
    title: "Review and quote",
    description:
      "The design is checked for printability, then material, orientation and strength are chosen for the job. You get a quote and an estimated time before anything prints.",
  },
  {
    icon: Printer,
    title: "Print, inspect, hand off",
    description:
      "Parts are printed, cleaned up and checked before handoff, with any notes you need for fit or use.",
  },
];

export default function PrintingPage() {
  return (
    <>
      <SkipLink />
      <SiteHeader current="printing" />

      <main id="main-content">
        <section className="page-hero" aria-labelledby="page-heading">
          <div className="shell">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Additive manufacturing
            </p>
            <h1 id="page-heading">Functional prints, prepared and checked.</h1>
            <p className="page-hero-summary">
              AP3X prepares designs for printing, runs prototype iterations and produces
              custom parts for reviewed, non-safety-critical uses. Small runs and one-off
              parts are the focus.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="equipment-heading">
          <div className="shell">
            <div className="section-intro">
              <p className="section-kicker">Equipment</p>
              <h2 id="equipment-heading">The printer behind the work.</h2>
              <p>
                Jobs run on an enclosed, multi-material machine and are prepared in Bambu
                Studio, so settings are matched to each part rather than left on defaults.
              </p>
            </div>

            <div className="spec-panel">
              <div className="spec-panel-title">
                <span className="icon-box">
                  <Printer size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h3>Bambu Lab X1 Carbon</h3>
                  <p>Enclosed core-XY printer</p>
                </div>
              </div>
              <dl className="spec-list">
                <div>
                  <dt>Build volume</dt>
                  <dd>256 × 256 × 256 mm</dd>
                </div>
                <div>
                  <dt>Materials</dt>
                  <dd>PLA, PLA Matte, PETG, PETG-CF</dd>
                </div>
                <div>
                  <dt>Multi-color</dt>
                  <dd>Yes, with multiple AMS units</dd>
                </div>
                <div>
                  <dt>Slicer</dt>
                  <dd>Bambu Studio</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section process-section" aria-labelledby="materials-heading">
          <div className="shell">
            <div className="section-intro">
              <p className="section-kicker">Materials</p>
              <h2 id="materials-heading">Chosen for what the part has to do.</h2>
              <p>
                The right material depends on load, heat, flexibility and finish. If you are
                not sure which you need, describe the use and AP3X will recommend one.
              </p>
            </div>

            <div className="service-grid">
              {materials.map((material) => (
                <article className="service-card material-card" key={material.name}>
                  <div className="card-topline">
                    <span className="icon-box">
                      <Layers size={22} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </div>
                  <h3>{material.name}</h3>
                  <p>{material.use}</p>
                  <ul role="list">
                    <li>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      {material.detail}
                    </li>
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="projects-heading">
          <div className="shell process-layout">
            <div className="process-heading-wrap">
              <p className="section-kicker">Recent work</p>
              <h2 id="projects-heading">Parts that solve a real problem.</h2>
              <p>
                Most jobs are practical: something that organizes, holds, protects or
                replaces. A few examples of what has been made so far.
              </p>
            </div>

            <ol className="process-list" role="list">
              {projects.map((project, index) => (
                <li key={project.title}>
                  <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section about-section" aria-labelledby="job-heading">
          <div className="shell">
            <div className="about-panel">
              <div className="about-copy">
                <p className="section-kicker">How a print job works</p>
                <h2 id="job-heading">From file to finished part.</h2>
                <p>
                  Every job is quoted individually. Price and timing depend on size,
                  material, quantity and how much design work is needed.
                </p>
                <p className="file-note">
                  <FileInput size={16} aria-hidden="true" />
                  Send STL, 3MF or STEP files, or start from a sketch and measurements.
                </p>
              </div>

              <div className="principles-grid">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <article key={step.title}>
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="section limits-section" aria-labelledby="limits-heading">
          <div className="shell">
            <div className="limits-panel">
              <Ban size={22} strokeWidth={1.8} aria-hidden="true" />
              <div>
                <h2 id="limits-heading">What AP3X does not print</h2>
                <p>
                  Safety-critical parts are declined. That includes anything a person&apos;s
                  safety depends on, such as load-bearing parts for people, vehicle steering
                  or braking components, pressure-holding parts, and medical devices.
                  Weapons and weapon components are also declined.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ContactPanel
          kicker="Start a print request"
          heading="Have a part in mind?"
          body="Send the file or describe the part, what it needs to do, and how many you need. AP3X will reply with questions or a quote."
          subject="3D print request"
          buttonLabel="Request a print quote"
        />
      </main>

      <SiteFooter />
    </>
  );
}
