import { collections } from "@/content/config";
import { config, fields, collection } from "@keystatic/core";
import type { date } from "astro/zod";

export default config({
  storage: {
    kind: "local",
  },

  collections: {
    postsCollection: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      entryLayout: "content",
      columns: ["title", "date"],
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        meta_title: fields.text({
          label: "Meta Title",
          validation: {
            isRequired: false,
            length: {
              min: 0,
              max: 120,
            },
          },
          multiline: true,
        }),
        date: fields.date({
          defaultValue: { kind: "today" },
          label: "Date of the publication",
        }),
        isFeatured: fields.checkbox({
          label: "Is Featured",
          defaultValue: false,
        }),
        draft: fields.checkbox({ label: "Draft" }),
        authors: fields.array(
          fields.relationship({
            label: "Post author",
            collection: "authors",
          }),
          {
            label: "Authors",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value || "Please select an author",
          },
        ),
        image: fields.image({
          label: "Image",
          directory: "src/assets/images/pages",
          publicPath: "../../assets/images/pages/",
        }),
        categories: fields.array(
          fields.relationship({
            label: "NewsCategory Categories",
            collection: "categories",
          }) as any,
          {
            label: "Categories",
            validation: { length: { min: 1 } },
            itemLabel: (props: any) =>
              props.value || "Please select a category",
          } as any,
        ),
        tags: fields.array(
          fields.text({ label: "Tags" }),
          // Labelling options
          {
            label: "Tags",
            itemLabel: (props) => props.value,
          },
        ),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
          // formatting: true,
          // dividers: true,
          // links: true,
          // images: true,
        }),
      },
    }),
  },
});

categories: collection({
  label: "categories",
  path: "src/content/categories/*",
  slugField: "categoryNameEn",
  columns: ["categoryNameEn", "categoryNameEs"],
  schema: {
    categoryNameEn: fields.slug({
      name: {
        label: "Category Name (English)",
        validation: {
          length: {
            min: 1,
          },
        },
      },
    }),
    categoryNameEs: fields.text({
      label: "Category Name (Spanish)",
      validation: {
        length: {
          min: 1,
        },
      },
    }),
  },
});

authors: collection({
  label: "Authors",
  path: "src/content/authors/*",
  slugField: "name",
  schema: {
    name: fields.slug({
      name: {
        label: "Name",
        validation: {
          length: {
            min: 1,
          },
        },
      },
    }),
    role: fields.text({ label: "Role" }),
    avatar: fields.image({
      label: "Author avatar",
      directory: "public/images/authors",
    }),
  },
});

pages: collection({
  label: "Pages",
  slugField: "title",
  path: "src/content/pages/*",
  entryLayout: "content",
  columns: ["title", "description", "noIndex"],
  format: { contentField: "content" },
  schema: {
    title: fields.slug({ name: { label: "SEO Title" } }),
    description: fields.text({
      label: "SEO Description",
      multiline: true,
    }),
    ogImage: fields.image({
      label: "Image",
      directory: "src/assets/images/pages",
      publicPath: "../../assets/images/pages/",
    }),
    noIndex: fields.checkbox({
      label: "Don't index the page",
      defaultValue: false,
    }),
    // content: fields.mdx({
    //   label: "Content",
    //   options: {
    //     image: {
    //       directory: "src/assets/images/pages",
    //       publicPath: "../../assets/images/pages/",
    //     },
    //   },
    // }),
  },
});
