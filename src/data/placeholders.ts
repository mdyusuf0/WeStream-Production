export type PlaceholderProject = {
  id: string;
  title: string;
  status: string;
};

export const placeholders = {
  projectTitle: "WeStream Production",
  status: "Foundation in progress",
  contentStatus: "Client content pending",
  hero: {
    title: "WeStream Production",
    subtitle: "Premium creative production studio.",
    mediaStatus: "Showreel / Hero Media Pending",
  },
  work: {
    sectionTitle: "Selected Work",
    projects: [
      { id: "01", title: "Project 01", status: "Project details pending" },
      { id: "02", title: "Project 02", status: "Project details pending" },
      { id: "03", title: "Project 03", status: "Project details pending" },
    ] as PlaceholderProject[],
  },
  capabilities: {
    sectionTitle: "Capabilities",
    status: "Capabilities pending client confirmation",
    provisionalList: [
      "Commercial Editing",
      "Motion Design",
      "Visual Effects",
      "Color Grading",
      "Sound Design",
    ],
  },
  studio: {
    sectionTitle: "Studio",
    status: "Company story pending client confirmation",
    teaser:
      "We are a team of visual storytellers, editors, and motion designers. Full philosophy and team details are pending client discovery.",
  },
  trust: {
    sectionTitle: "The WeStream Impact",
    logosStatus: "Client logos pending approval",
    testimonialsStatus: "Testimonials pending approval",
  },
  contact: {
    sectionTitle: "Start a conversation",
    status: "Project enquiry details pending",
  },
};
