/*
  TODO more advanced Jest config in Next.js
  Jest config allows a `projects` property to define separate configurations 
  to be used in different scenarios, for instance using jest-environment-node to 
  test server code, run eslint and type checking within Jest and add labels to 
  the output for a clean overview of what config the tests are related to. 

  This config doesn't work out of the boc with Next, at least not in the way I 
  have learned from the Kent C. Dodds (author of Testing Library) Testing 
  JavaScript course. 

  In the Next.js docs and example repo for Jest config 'jest-environment-jsdom' 
  is the only example given. To test code that runs in a Node env with any sort 
  of confidence, we need to use a node testing env!

  I have asked in the Next.js & Testing JavaScript Discord - for a full stack 
  framework that uses the Node env to run code on the server, they should 
  provide a Node env to run our tests too! 
  
  Note: There is now an "edge" env as well. For Vercel's edge functions feature 
  they use Cloudflare Workers under the hood. Something to consider. 
*/

const nextJest = require('next/jest');
const path = require('path');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // testEnvironment: 'jest-environment-node' is for when tests don't rely on browser APIs. This is a React app with little backend code, so we want to use the js-dom env
  testEnvironment: 'jest-environment-jsdom',
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: [
    'node_modules',
    '<rootDir>/',
    // import our custom render + testing library modules as if it were a node module: import { render } from 'test/test-utils';
    path.join(__dirname, 'test'),
  ],
  // TypeScript alias path for root to match that of tsconfig and avoid ../../../../../ hell
  moduleNameMapper: { '^~/(.*)$': '<rootDir>/./$1' },
  // Add more setup options before each test is run.
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  // serialize emotion classes like `chakra-stack css-4lej6k` to actual CSS in our snapshots.
  snapshotSerializers: ['@emotion/jest/serializer'],
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
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
