import type { Config } from 'jest';
import path from 'path';

const lintConfig: Config = {
  // point this config to the root directory
  rootDir: path.join(__dirname, '..'),
  // label test output in terminal
  displayName: 'lint',
  // use Jest to run linting
  runner: 'jest-runner-eslint',
  // file matching glob
  testMatch: ['<rootDir>/**/*.+(ts|tsx)'],
};

export default lintConfig;
