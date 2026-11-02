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
            S.listItem()
              .title("Reviews")
              .child(
                S.list()
                  .title("Reviews")
                  .items([
                    S.listItem()
                      .title("Pending Reviews")
                      .child(
                        S.documentList()
                          .title("Pending Reviews (Public Drafts to Publish)")
                          .filter(
                            '_type == "testimonial" && _id in path("drafts.**") && source == "public-form" && !defined(*[_type == "testimonial" && _id == string::split(^._id, "drafts.")[1]][0])'
                          )
                      ),
                    S.listItem()
                      .title("Approved Reviews")
                      .child(
                        S.documentList()
                          .title("Approved Reviews (Published)")
                          .filter('_type == "testimonial" && !(_id in path("drafts.**"))')
                      ),
                    S.divider(),
                    S.documentTypeListItem("testimonial").title("All Testimonials"),
                  ])
              ),
            S.divider(),
            S.documentTypeListItem("experience").title("Experience"),
            S.documentTypeListItem("education").title("Education"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
