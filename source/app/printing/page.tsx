import { Ban, CheckCircle2, FileInput, Layers, Printer, ScanSearch, Send } from "lucide-react";
import Image from "next/image";
import { pageMetadata } from "../_components/page-metadata";
import { ContactPanel, SiteFooter, SiteHeader, SkipLink } from "../_components/site-chrome";

export const metadata = pageMetadata({
  path: "/printing/",
  title: "3D Printing",
  description:
    "Custom 3D-printed parts, prototypes and fixtures from AP3X Operations in Franklin, NY. Printed on a Bambu Lab X1 Carbon in PLA, PETG, PETG-CF, TPU and ASA, with multicolor AMS printing.",
});

const materials = [
  {
    name: "PLA and PLA Matte",
    use: "Everyday parts, organizers, fixtures, tags and signage. Clean finish in gloss or matte.",
    detail: "Full spectrum of colors in stock.",
  },
  {
    name: "PETG and PETG-CF",
    use: "Tougher parts with more impact and heat resistance than PLA. Carbon-fiber PETG‑CF adds stiffness for brackets, mounts and jigs.",
    detail: "Translucent PETG available.",
  },
  {
    name: "TPU",
    use: "Flexible parts such as grips, bumpers, covers and protective pieces.",
    detail: "AMS-compatible grades for multi-material parts.",
  },
  {
    name: "ASA",
    use: "Outdoor and sun-exposed parts. Resists UV and weathering, and handles heat better than PLA or PETG.",
    detail: "Printed in the enclosed X1 Carbon.",
  },
];

type Project = {
  title: string;
  description: string;
  photo?: { thumb: string; full: string; alt: string };
};

const projects: Project[] = [
  {
    title: "Home lab equipment rack",
    description:
      "A custom 3D-printed rack system for a home lab. It holds a four-bay drive enclosure, a cluster of single-board computers, a network switch and supporting hardware, in a printed frame sized to the equipment.",
    photo: {
      thumb: "/work/homelab-rack-thumb.webp",
      full: "/work/homelab-rack.webp",
      alt: "Black 3D-printed equipment rack holding a four-bay drive enclosure, three networked single-board computers and a network switch.",
    },
  },
  {
    title: "Wall key rack with shelf",
    description:
      "A wall-mounted key rack with a shelf above for mail and small items, and a row of hooks below so everyday keys have a fixed place.",
    photo: {
      thumb: "/work/key-rack-thumb.webp",
      full: "/work/key-rack.webp",
      alt: "White 3D-printed wall key rack with five black hooks and a shelf, holding several sets of keys.",
    },
  },
  {
    title: "Batch run of small parts",
    description:
      "A full build plate of small linked parts printed in a single run on the X1 Carbon. Laying out repeat parts as one batch keeps setup time and cost per part down.",
    photo: {
      thumb: "/work/batch-plate-thumb.webp",
      full: "/work/batch-plate.webp",
      alt: "Inside the X1 Carbon: a black build plate holding rows of small white linked parts, with the toolhead parked above them.",
    },
  },
  {
    title: "Fleet key tag system",
    description:
      "Twelve custom key tags, each holding three keys, plus a wall-mounted rack to hang them on. Designed so every set has a fixed, labeled place. About 9¾ hours of total print time.",
  },
];

const detailViews = [
  {
    src: "/work/helmet-front.webp",
    label: "Front",
    alt: "Small black 3D-printed sci-fi helmet model, front three-quarter view, showing visor and panel detail.",
  },
  {
    src: "/work/helmet-top.webp",
    label: "Top",
    alt: "The same helmet model from above, showing raised panel lines and small rivet details.",
  },
  {
    src: "/work/helmet-rear.webp",
    label: "Rear",
    alt: "The same helmet model from behind, showing ridged back panels.",
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

            <div className="equipment-layout">
              <figure className="equipment-photo equipment-photo-main">
                <a href="/work/x1c-ams.webp" aria-label="View full photo: Bambu Lab X1 Carbon with AMS">
                  <Image
                    src="/work/x1c-ams.webp"
                    alt="Bambu Lab X1 Carbon printer with an AMS multi-material unit mounted on top."
                    width={900}
                    height={1407}
                    sizes="(max-width: 980px) 100vw, 420px"
                  />
                </a>
                <figcaption>The X1 Carbon with its AMS on top.</figcaption>
              </figure>

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
                  <dd>PLA, PLA Matte, PETG, PETG-CF, TPU, ASA</dd>
                </div>
                <div>
                  <dt>Multicolor</dt>
                  <dd>AMS printing, up to 12 colors per profile</dd>
                </div>
                <div>
                  <dt>Filament handling</dt>
                  <dd>AMS plus two AMS HT units with drying</dd>
                </div>
                <div>
                  <dt>Slicer</dt>
                  <dd>Bambu Studio</dd>
                </div>
              </dl>
            </div>

              <figure className="equipment-photo">
                <a href="/work/ams-ht.webp" aria-label="View full photo: two AMS HT units">
                  <Image
                    src="/work/ams-ht.webp"
                    alt="Two Bambu Lab AMS HT units loaded with black and green filament, each showing humidity and temperature on its display."
                    width={900}
                    height={506}
                    sizes="(max-width: 980px) 100vw, 640px"
                  />
                </a>
                <figcaption>
                  Two AMS HT units dry filament and feed it to the printer, with humidity and
                  temperature on each display.
                </figcaption>
              </figure>
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

            <div className="service-grid material-grid">
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
                    {project.photo ? (
                      <figure className="project-figure">
                        <a href={project.photo.full} aria-label={`View full photo: ${project.title}`}>
                          <Image
                            src={project.photo.thumb}
                            alt={project.photo.alt}
                            width={640}
                            height={800}
                            sizes="(max-width: 720px) 100vw, 340px"
                          />
                        </a>
                        <figcaption>Select the photo to view it full size.</figcaption>
                      </figure>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section process-section" aria-labelledby="detail-heading">
          <div className="shell">
            <div className="section-intro">
              <p className="section-kicker">Detail up close</p>
              <h2 id="detail-heading">Fine detail at small scale.</h2>
              <p>
                A small helmet model, shown from three angles. Panel lines, vents and
                rivets come through cleanly even at miniature size.
              </p>
            </div>

            <div className="detail-gallery">
              {detailViews.map((view) => (
                <figure className="equipment-photo" key={view.src}>
                  <a href={view.src} aria-label={`View full photo: helmet model, ${view.label.toLowerCase()} view`}>
                    <Image
                      src={view.src}
                      alt={view.alt}
                      width={900}
                      height={1125}
                      sizes="(max-width: 720px) 100vw, 380px"
                    />
                  </a>
                  <figcaption>{view.label}</figcaption>
                </figure>
              ))}
            </div>
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
