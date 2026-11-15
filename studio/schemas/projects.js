export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "description", title: "Description", type: "text", validation: (Rule) => Rule.required() },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "githubUrl", title: "GitHub URL", type: "url", description: "Optional. Shows a GitHub button on the card and in project details. Leave empty to hide it.", validation: Rule => Rule.uri({ scheme: ["http", "https"] }) },
    { name: "liveUrl", title: "Live Site URL", type: "url", description: "Optional. Shows the Live Site button. If GitHub is also provided, the buttons share the row.", validation: Rule => Rule.uri({ scheme: ["http", "https"] }) },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Freelancing", value: "freelancing" },
          { title: "Personal", value: "personal" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
    { name: "completedAt", title: "Completion Date", type: "date" },
    { name: "order", title: "Order", type: "number", initialValue: 0 },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
};
