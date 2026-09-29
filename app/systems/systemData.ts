export type ServiceGroup = {
  id: string;
  index: string;
  title: string;
  summary: string;
  image: string;
  items: string[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "digital-experience",
    index: "01",
    title: "Digital Experience",
    summary: "Customer-facing digital products designed to feel clear, fast and consistent across every screen.",
    image: "/about-future.jpg",
    items: ["Mobile Applications", "Web Applications", "UI/UX Design & Branding", "Branding & Digital Identity"],
  },
  {
    id: "product-development",
    index: "02",
    title: "Product Development",
    summary: "From first working version to mature software products, built with a disciplined delivery model.",
    image: "/service-process.webp",
    items: ["MVP Development", "Low-code Development", "Software Development", "IT Staff Augmentation", "Software Quality Assurance"],
  },
  {
    id: "managed-services",
    index: "03",
    title: "Managed Services",
    summary: "Practical support for the infrastructure, security and software your operation depends on every day.",
    image: "/services-hero.webp",
    items: ["Cloud Operations", "DevSecOps", "Cybersecurity", "Software Maintenance"],
  },
  {
    id: "enterprise-solutions",
    index: "04",
    title: "Enterprise Solutions",
    summary: "Connected platforms that reduce fragmentation across teams, data, customers and operational workflows.",
    image: "/contact-hero.webp",
    items: ["ERP / CRM & System Integration", "Cloud Migration", "Workflow Integration", "Data & Reporting Systems"],
  },
  {
    id: "innovation-services",
    index: "05",
    title: "Innovation Services",
    summary: "Emerging technology applied where it can create a measurable operational or customer advantage.",
    image: "/about-process.jpg",
    items: ["AI & Machine Learning", "IoT & Connected Systems", "Automation", "Blockchain & Emerging Technology"],
  },
  {
    id: "market-expansion",
    index: "06",
    title: "Overseas Market Expansion",
    summary: "Technology and local execution support for organisations entering Rwanda and the wider East African market.",
    image: "/about-africa.jpg",
    items: ["Rwanda Market Entry", "East Africa Market Expansion", "Local Technology Partner", "Digital Market Setup"],
  },
  {
    id: "grant-advisory",
    index: "07",
    title: "Grant Advisory",
    summary: "Structured technical scoping and documentation for innovation programmes, investment readiness and funded digital projects.",
    image: "/about-rwanda.jpg",
    items: ["Digital Project Scoping", "Technology Proposal Support", "Innovation Funding Readiness", "Delivery Documentation"],
  },
];

export const industries = [
  ["Education", "Learning platforms, administration, enrolment and reporting."],
  ["Banking, Finance & Insurance", "Secure customer journeys, operations and internal systems."],
  ["Manufacturing & Commerce", "Inventory, orders, marketplaces, reporting and workflow automation."],
  ["Government & Institutions", "Clear digital services, information systems and internal workflows."],
  ["Healthcare", "Operational tools, service journeys and secure information flows."],
  ["Real Estate & Property", "Property operations, maintenance, tenant and owner experiences."],
  ["Hospitality & Food", "Ordering, reservations, operations, customer experience and reporting."],
  ["Other Businesses", "Purpose-built systems for organisations with unique operating models."],
];

export const processSteps = [
  ["01", "Product Discovery", "We define the business problem, users, process, constraints and success criteria before technology choices are made."],
  ["02", "Design Lifecycle", "We shape the information architecture, interface, interaction model and product behaviour before development."],
  ["03", "Development Lifecycle", "We build the product, connect services, protect data and test the workflows that matter."],
  ["04", "Go Live", "Deployment, acceptance testing, access control, domains, databases and launch readiness are handled as one release process."],
  ["05", "Maintenance", "We keep the system current through support, fixes, upgrades, security reviews and planned improvements."],
];

export const caseStudies = [
  {
    title: "Commerce Platform",
    tag: "MARKETPLACE / OPERATIONS",
    image: "/about-future.jpg",
    text: "Product discovery, catalogue logic, services booking, inventory connections and an easier path from browsing to purchase.",
  },
  {
    title: "Hospitality Ordering",
    tag: "FOOD / DELIVERY / OPERATIONS",
    image: "/service-process.webp",
    text: "Customer ordering, kitchen flow, delivery assignment, reporting and operational controls designed as one connected system.",
  },
  {
    title: "Property Operations",
    tag: "REAL ESTATE / MAINTENANCE",
    image: "/contact-hero.webp",
    text: "Owner, property and maintenance workflows brought into a focused digital operating experience.",
  },
  {
    title: "Business Control Systems",
    tag: "INTERNAL TOOLS / REPORTING",
    image: "/services-hero.webp",
    text: "Dashboards, workflow automation, permissions, audit trails and reporting for teams that need reliable operational visibility.",
  },
];
