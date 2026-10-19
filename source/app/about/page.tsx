import { Award, FileCheck2, MessageSquareText, Wrench } from "lucide-react";
import { pageMetadata } from "../_components/page-metadata";
import { ContactPanel, SiteFooter, SiteHeader, SkipLink } from "../_components/site-chrome";

export const metadata = pageMetadata({
  path: "/about/",
  title: "About",
  description:
    "Sebastien Gifford founded AP3X Operations LLC in Franklin, NY, bringing together hands-on experience in operations, technology support and 3D printing.",
});

const experience = [
  {
    years: "2026",
    title: "Operations and technology coordination",
    context: "Roofing and construction",
    description:
      "Customer service and technology coordination, moving into production support. Built production tracking and a sales-to-production handoff, prepared material orders and takeoffs, coordinated municipal permit paperwork and tracked customer follow-ups.",
  },
  {
    years: "2026",
    title: "Workshop planning and equipment requisition",
    context: "Engineering workshop",
    description:
      "Planned workshop layout, researched and specified equipment, prepared purchase orders and wrote requirements for contractors and electricians.",
  },
  {
    years: "2024 – 2025",
    title: "Technical Operations Associate",
    context: "Shipping, printing and document services",
    description:
      "Day-to-day technical operations in a customer-facing print and document environment.",
  },
  {
    years: "2022 – 2023",
    title: "Network Infrastructure Installer",
    context: "Telecommunications and fiber optics",
    description:
      "Installed, tested and staged fiber-optic installations on telecommunications projects for AT&T and Verizon.",
  },
  {
    years: "2018 – 2020",
    title: "Volunteer PC Technician",
    context: "Community volunteer work",
    description:
      "Assembled PCs, diagnosed hardware and software problems and set up peripherals.",
  },
];

const toolGroups = [
  {
    label: "Systems",
    tools: ["Windows", "Linux (Ubuntu, Debian)", "Hyper-V", "Docker", "SSH", "Raspberry Pi"],
  },
  {
    label: "Networking and hosting",
    tools: ["Cloudflare", "Tailscale", "GitHub"],
  },
  {
    label: "Business tools",
    tools: ["Google Sheets", "Google Drive", "Google Apps Script", "Microsoft Office", "Jobber"],
  },
  {
    label: "Fabrication",
    tools: ["Bambu Studio", "Bambu Lab X1 Carbon", "AMS multicolor"],
  },
];

const principles = [
  {
    icon: MessageSquareText,
    title: "Plain-language communication",
    description:
      "Patience, clear explanations and attention to detail, especially for people who do not work with technology every day.",
  },
  {
    icon: FileCheck2,
    title: "Documentation that outlasts the job",
    description:
      "Instructions detailed enough that the next person is not left guessing, written at the level the reader actually needs.",
  },
  {
    icon: Wrench,
    title: "Hands-on, practical fixes",
    description:
      "Real experience with the hardware, software and paperwork involved, rather than recommendations from a distance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SkipLink />
      <SiteHeader current="about" />

      <main id="main-content">
        <section className="page-hero" aria-labelledby="page-heading">
          <div className="shell">
            <p className="eyebrow">
              <span aria-hidden="true" />
              About AP3X
            </p>
            <h1 id="page-heading">Sebastien Gifford, founder.</h1>
            <p className="page-hero-summary">
              AP3X Operations LLC is a New York single-member LLC, established August 28,
              2026 and based in Franklin, NY. It brings together three kinds of work
              Sebastien has done hands-on: keeping operations organized, keeping technology
              running, and making useful physical parts.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="approach-heading">
          <div className="shell">
            <div className="about-panel">
              <div className="about-copy">
                <p className="section-kicker">How the work gets done</p>
                <h2 id="approach-heading">Clear, practical and written down.</h2>
                <p>
                  The common thread across roofing operations, telecom installs, print
                  services and home-lab infrastructure is the same: understand how the work
                  actually happens, make it simpler, and leave it documented for whoever
                  comes next.
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

        <section className="section process-section" aria-labelledby="experience-heading">
          <div className="shell process-layout">
            <div className="process-heading-wrap">
              <p className="section-kicker">Experience</p>
              <h2 id="experience-heading">Where the experience comes from.</h2>
              <p>
                Operations, field and support roles across several industries, most recent
                first.
              </p>
            </div>

            <ol className="process-list experience-list" role="list">
              {experience.map((item) => (
                <li key={item.title}>
                  <span className="step-number">{item.years}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="experience-context">{item.context}</p>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" aria-labelledby="tools-heading">
          <div className="shell">
            <div className="section-intro">
              <p className="section-kicker">Tools and platforms</p>
              <h2 id="tools-heading">Tools in daily use.</h2>
              <p>
                Experience from day-to-day work, self-hosted server projects and the
                AP3X print setup.
              </p>
            </div>

            <div className="tool-groups">
              {toolGroups.map((group) => (
                <div className="tool-group" key={group.label}>
                  <h3>{group.label}</h3>
                  <ul className="chip-list" role="list">
                    {group.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="cert-row">
              <Award size={20} strokeWidth={1.8} aria-hidden="true" />
              <p>
                <strong>Certification:</strong> IC3 Digital Literacy.
              </p>
            </div>
          </div>
        </section>

        <ContactPanel
          kicker="Work with AP3X"
          heading="Tell us what you are working on."
          body="Share the problem, the desired outcome, and your timing. AP3X will respond with the next practical step."
        />
      </main>

      <SiteFooter />
    </>
  );
}
