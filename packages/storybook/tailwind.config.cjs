const lumenPreset = require("@lumen/tokens/tailwind-preset");
const shadcnPreset = require("../ui/src/styles/shadcn-tailwind-preset.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [lumenPreset, shadcnPreset],
  content: [
    "../ui/src/**/*.{ts,tsx,mdx}",
    "../patterns/src/**/*.{ts,tsx,mdx}",
    "./.storybook/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}"
  ]
};
