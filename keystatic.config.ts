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
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        description: fields.text({ label: 'Description' }),
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

collections: {
pages: collection({
  id: String,
  title: String,
  meta_title: { type: String, optional: true },
  description: { type: String, optional: true },
  image: { type: String, optional: true },
  layout: { type: String, optional: true },
  slugTitle: {
    name: {
      label: String
    }
  },
  content: {
    label: 'Content',
    formatting: true,
    dividers: true,
    links: true,
    images: true
  },
});
}

