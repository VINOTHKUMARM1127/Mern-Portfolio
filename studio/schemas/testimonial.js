export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "clientRole",
      title: "Client Role / Company",
      type: "string",
      description: "e.g. CEO of TechCorp, Startup Founder",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "quote",
      title: "Review / Quote",
      type: "text",
      description: "The testimonial text written by the client.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    },
    {
      name: "clientImage",
      title: "Client Image",
      type: "image",
      options: { hotspot: true },
    },
  ],
  preview: {
    select: { title: "clientName", subtitle: "clientRole", media: "clientImage" },
  },
};
