import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // eslint({
    //   // Enable this option to show ESLint errors as warnings instead of blocking the build
    //   emitWarning: true,
    //   emitError: false,
    // }),
  ],
  css: {
    modules: {
      localsConvention: "camelCaseOnly", // or 'dashes' depending on your preference
    },
  },
});
