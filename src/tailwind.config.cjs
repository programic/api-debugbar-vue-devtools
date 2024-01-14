const fs = require('node:fs');
/** @type {import('tailwindcss').Config} */
const config = require('./src/tailwind/config.cjs');

const files = [
  './src/modules/**/**/*.{js,vue,ts}',
  './src/stories/**/**/*.stories.ts',
  './src/main.ts',
  './src/App.vue',
];

try {
  if (fs.existsSync('./src/Playground.vue')) {
    files.push('./src/Playground.vue');
  }
} catch {
  //
}
