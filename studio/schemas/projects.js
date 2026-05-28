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
    { name: "githubUrl", title: "GitHub URL", type: "url" },
    { name: "liveUrl", title: "Live Demo URL", type: "url" },
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
