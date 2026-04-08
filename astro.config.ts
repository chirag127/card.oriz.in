import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://card.oriz.in",
  output: "static",
  integrations: [
    react(),
    mdx(),
    sitemap(),
    pagefind(),
  ],
  image: {
    service: { entrypoint: "astro/assets/services/sharp" },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: "lightningcss",
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
});
