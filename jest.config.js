/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  roots: ['<rootDir>/src'],

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**', '!**/test/**'
  ],

  coverageDirectory: 'coverage',

  testEnvironment: 'node',

  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
