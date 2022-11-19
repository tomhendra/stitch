module.exports = {
  // Type check TypeScript files
  '**/*.+(ts|tsx)': () => 'tsc -p tsconfig.json --noEmit',
  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': filenames => [
    `pnpm eslint ${filenames.join(' ')}`,
    `pnpm prettier --write ${filenames.join(' ')}`,
  ],
  // Prettify other files
  '**/*.+(css|scss|json|md|mdx)': filenames =>
    `pnpm prettier --write ${filenames.join(' ')}`,
};
