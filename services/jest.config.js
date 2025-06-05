module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleFileExtensions: ['js', 'ts'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{ts,js}', '!**/node_modules/**', '!**/dist/**'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  };