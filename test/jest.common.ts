import type { Config } from 'jest';
import path from 'path';

const commonConfig: Config = {
  // point this config to the root directory
  rootDir: path.join(__dirname, '..'),
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: [
    'node_modules',
    '<rootDir>/',
    // import our custom render + testing library modules as if it were a node module: import { render } from 'test/test-utils';
    '<rootDir>/test',
  ],
  // TypeScript alias path for root to match that of tsconfig and avoid imports from ../../../../
  moduleNameMapper: { '^~/(.*)$': '<rootDir>/./$1' },
  // better DX for interacting with the cli tool
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};

export default commonConfig;
