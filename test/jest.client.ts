import commonJestConfig from './jest.common';
import type { Config } from 'jest';

const clientConfig: Config = {
  ...commonJestConfig,
  // label test output in terminal
  displayName: 'client',
  // for client-side testing we want jsdom env
  testEnvironment: 'jest-environment-jsdom',
  // Add more setup options before each test is run.
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  // serialize emotion classes like `chakra-stack css-4lej6k` to actual CSS in our snapshots.
  snapshotSerializers: ['@emotion/jest/serializer'],
};

export default clientConfig;
