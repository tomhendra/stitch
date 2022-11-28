import type { Config } from 'jest';

const serverJestConfig: Config = {
  // label test output in terminal
  displayName: 'server',
  // set the test environment to node
  testEnvironment: 'jest-environment-node',
  // specify where our server tests will be located
  testMatch: ['**/__tests_server__/**/*.ts'],
  // transpile modules
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export default serverJestConfig;
