const tokensPreset = require("@lumen/tokens/tailwind-preset");
const shadcnPreset = require("./src/styles/shadcn-tailwind-preset.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tokensPreset, shadcnPreset],
  content: ["./src/**/*.{ts,tsx}"]
};
