import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import monkey, { cdn } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://zh.minecraft.wiki/favicon.ico",
        name: "Minecraft Wiki Teleport",
        description: "废弃Fandom上的Minecraft Wiki，从我做起！",
        namespace: "com.undsf.tmus.mcwikitp",
        match: ["https://minecraft.fandom.com/zh/wiki/*"],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr("Vue", "dist/vue.global.prod.js"),
        },
      },
    }),
  ],
});
