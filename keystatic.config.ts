import { collections } from '@/content/config';
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      entryLayout: "content",
			columns: ["title", "datePublished"],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
				description: fields.text({
					label: "Description",
					multiline: true,
				}),
				datePublished: fields.datetime({
					defaultValue: { kind: "now" },
					label: "Date of the publication",
				}),
        tags: fields.multiselect({
					label: "Tags",
					options: [{ label: "Tag", value: "Tag" }],
				}),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});



