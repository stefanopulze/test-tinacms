import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

const contentBlock: TinaTemplate = {
  name: 'content',
  label: 'Content',
  ui: {
    defaultItem: {
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
    },
  },
  fields: [
    {
      type: 'string',
      ui: {
        component: 'textarea',
      },
      label: 'Body',
      name: 'body',
    },
  ],
}

export default defineConfig({
  branch,
  clientId: "427d34a5-2aa8-45c3-ac3e-66276ccb11d5", // Get this from tina.io
  token: "b163d69352b1ed21d5edfc1b5cb43b3025e9a13f", // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "home",
        label: "Home",
        path: "content",
        match: {
          include: '_index',
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            templates: [contentBlock]
          }
        ]
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
