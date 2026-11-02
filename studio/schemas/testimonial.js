export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  description:
    "Testimonials and client reviews. Approving a review means clicking 'Publish' at the bottom. Unpublished reviews remain as drafts and are invisible to the public site.",
  orderings: [
    {
      title: "Newest First",
      name: "newestFirst",
      by: [
        { field: "submittedAt", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  fields: [
    {
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    },
    {
      name: "clientRole",
      title: "Client Role / Company",
      type: "string",
      description: "e.g. CEO of TechCorp, Startup Founder",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "quote",
      title: "Review / Quote",
      type: "text",
      description: "The testimonial text written by the client.",
      validation: (Rule) => Rule.required().min(10).max(800),
    },
    {
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1).max(5),
      initialValue: 5,
    },
    {
      name: "clientImage",
      title: "Client Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
      description: "Timestamp when the review was submitted.",
    },
    {
      name: "source",
      title: "Source",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Studio", value: "studio" },
          { title: "Public Form", value: "public-form" },
        ],
      },
      initialValue: "studio",
    },
    {
      name: "contentHash",
      title: "Content Hash",
      type: "string",
      readOnly: true,
      hidden: true,
      description: "Normalized hash for duplicate prevention.",
    },
  ],
  preview: {
    select: {
      clientName: "clientName",
      clientRole: "clientRole",
      rating: "rating",
      id: "_id",
      media: "clientImage",
    },
    prepare({ clientName, clientRole, rating, id, media }) {
      const stars = rating ? `⭐ ${rating}` : "No rating";
      const isDraft = id ? id.startsWith("drafts.") : false;
      const status = isDraft ? "⏳ Pending (Unpublished)" : "✅ Published";
      const role = clientRole || "Client";
      return {
        title: clientName || "Anonymous",
        subtitle: `${stars} · ${status} · ${role}`,
        media,
      };
    },
  },
};
