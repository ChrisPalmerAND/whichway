const path = require('path');

const buildEslintCommand = (packageName) => (filenames) =>
  `yarn workspace ${packageName} lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  'packages/frontend/**/*.{js,jsx,ts,tsx}': [buildEslintCommand('admin')],
  'packages/backend/**/*.{js,jsx,ts,tsx}': [buildEslintCommand('applicant')],
};
