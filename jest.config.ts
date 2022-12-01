/*
  TODO fix jest-environment-node module resolution

  In the Next.js docs and example repo for Jest config 'jest-environment-jsdom' 
  is the only env specified. https://github.com/vercel/next.js/tree/canary/examples/with-jest
  
  But to test server code that runs in a Node env with any sort of confidence, 
  we should be using an equivalent Node env for testing purposes.
  
  Jest config allows a `projects` array to define separate configurations to 
  be used in different scenarios, such as using different testing environments.

  After some trial and error, it seems that Next.js is happy as long as one 
  config is the default at <rootDir>, and the projects are treated as overrides.

  Here the default is client with server & lint config overrides.

  However there is a problem with the Node env resolving modules. I believe the 
  problem is related to https://github.com/vercel/next.js/issues/40183, but the 
  suggested workaround doesn't work here: https://github.com/vercel/next.js/issues/40183#issuecomment-1249077718

  Note: There is now an "edge" env as well for Vercel's edge functions, for which 
  they use Cloudflare Workers under the hood.
*/

import nextJest from 'next/jest';
import type { Config } from 'jest';
import serverJestConfig from './test/jest.server';
import lintJestConfig from './test/jest.lint';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: [
    'node_modules',
    '<rootDir>/',
    // import our custom render + testing library modules as if it were a node module: import { render } from 'test/test-utils';
    '<rootDir>/test',
  ],
  // TypeScript alias path for root to match that of tsconfig and avoid ../../../../../ hell
  moduleNameMapper: { '^~/(.*)$': '<rootDir>/./$1' },
  // better DX for interacting with the cli tool
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  //  include only app code in our test coverage reports to get a better sense of how well our app is tested
  collectCoverageFrom: [
    '**/components/**/*.+(ts|tsx)',
    '**/pages/**/*.+(ts|tsx)',
    '**/helpers/**/*.ts',
  ],
  // add goals for testing coverage. current level -2% is a good base, to allow for flexibility as changes are made
  coverageThreshold: {
    global: {
      statements: 24,
      branches: 2,
      lines: 25,
      functions: 19,
    },
    // bump up coverage for important or often-used code.
    './helpers/youtube-api.helper.ts': {
      statements: 100,
      branches: 80,
      lines: 100,
      functions: 100,
    },
  },
  // ? client config (default)
  // label test output in terminal
  displayName: 'client',
  // for client-side testing we want jsdom env
  testEnvironment: 'jest-environment-jsdom',
  // Add more setup options before each test is run.
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  // serialize emotion classes like `chakra-stack css-4lej6k` to actual CSS in our snapshots.
  snapshotSerializers: ['@emotion/jest/serializer'],
  // override behaviour for server test and using Jest to display lint results
  projects: ['<rootDir>', serverJestConfig, lintJestConfig],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const config = createJestConfig(customJestConfig);
export default config;
