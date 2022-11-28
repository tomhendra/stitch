/*
  TODO more advanced Jest config in Next.js

  In the Next.js docs and example repo for Jest config 'jest-environment-jsdom' 
  is the only env specified. https://github.com/vercel/next.js/tree/canary/examples/with-jest
  
  But to test code that runs in a Node env with any sort of confidence, we 
  should be using a Node env for testing.
  
  Jest config allows a `projects` property to define separate configurations 
  to be used in different scenarios, which includes using different testing 
  environments.

  However using such a config doesn't work out-of-the-box with Next, and throws 
  the following error:

      /Users/tom/Developer/stitch/test/jest.setup.ts:1
              ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import '@testing-library/jest-dom/extend-expect';
                                                                                                ^^^^^^

      SyntaxError: Cannot use import statement outside a module

  From research the community suggests to have ts-jest transpile for us. 

      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },

  But this just introduces a different error.

      /Users/tom/Developer/stitch/__tests__/pages/index.tsx:22
              (0, test_utils_1.render)(<index_1.default channels={channels}/>);
                                      ^

      SyntaxError: Unexpected token '<'
    
      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1449:14)

  Digging into the problem is tricky because Since the release of version 12, 
  Next.js has in-built configuration for Jest with SWC, their custom compiler
  which is great for abstracting complexity for us, but causes obfuscation too.

  I have asked for support in both the Next.js & Testing JavaScript Discords. 

  Update 27/11: Kent replied and suggested to use a docblock as a workaround 
  in the meantime until the issue is resolved.
  https://jestjs.io/docs/configuration#testenvironment-string

  Update 28/11: I have created our ideal config files in the test directory. 
  I believe the problem is related to https://github.com/vercel/next.js/issues/40183,
  but the suggested workaround doesn't work: https://github.com/vercel/next.js/issues/40183#issuecomment-1249077718

  Footnote: There is now an "edge" env as well. For Vercel's edge functions 
  feature they use Cloudflare Workers under the hood.
*/

import nextJest from 'next/jest';
import commonJestConfig from './jest.common';
import type { Config } from 'jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  ...commonJestConfig,
  //  include only app code in our test coverage reports to get a better sense of how well our app is tested
  collectCoverageFrom: [
    '**/components/**/*.+(ts|tsx)',
    '**/pages/**/*.+(ts|tsx)',
    '**/helpers/**/*.+(ts|tsx)',
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
  projects: [
    '<rootDir>/test/jest.lint.ts',
    '<rootDir>/test/jest.client.ts',
    '<rootDir>/test/jest.server.ts',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
