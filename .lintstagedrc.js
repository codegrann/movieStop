module.exports = {
  "**/*.ts?(x)": () => "npm run type-check",
  "**/*.(ts|tsx)": (filenames) => [
  `npm run lint:fix . ${filenames.join(" ")}`,
  `npm run prettier --write ${filenames.join(" ")}`,
  ],
};
