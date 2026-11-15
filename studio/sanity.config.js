import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "n2y8hmqi";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "portfolio-studio",
  title: "Portfolio CMS",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Portfolio")
          .items([
            S.documentTypeListItem("hero").title("Hero Section"),
            S.divider(),
            S.documentTypeListItem("project").title("Projects Section"),
            S.divider(),
            S.documentTypeListItem("testimonial").title("Reviews"),
            S.divider(),
            S.documentTypeListItem("experience").title("Experience"),
            S.documentTypeListItem("education").title("Education"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
