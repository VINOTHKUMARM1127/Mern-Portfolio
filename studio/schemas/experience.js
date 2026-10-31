export default {
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    {
      name: "role",
      title: "Role / Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "isCurrent",
      title: "Currently Working Here?",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM",
      },
      hidden: ({ parent }) => parent?.isCurrent,
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Briefly describe your responsibilities and achievements.",
    },
    {
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Used to sort experiences manually (lower numbers appear first)",
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: "role",
      subtitle: "company",
    },
  },
};
