import basicSsl from "@vitejs/plugin-basic-ssl";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// `basicSsl` is only for `pnpm dev`: the Visual Editor loads preview URLs over HTTPS. Vercel
// serves HTTPS itself, so it is skipped for the build.
export default defineConfig(({ command }) => ({
  plugins: [command === "serve" ? basicSsl() : undefined, vue()],
}));
