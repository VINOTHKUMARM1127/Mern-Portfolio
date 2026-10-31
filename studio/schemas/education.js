export default {
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    {
      name: "institution",
      title: "Institution Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "degree",
      title: "Degree / Course",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "year",
      title: "Duration / Year",
      type: "string",
      description: "e.g., '2018 - 2022' or '2022'",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Details about your studies, grades, or projects.",
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Used to sort education manually (lower numbers appear first)",
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: "degree",
      subtitle: "institution",
    },
  },
};
