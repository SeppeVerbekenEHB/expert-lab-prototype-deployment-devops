module.exports = {
    testEnvironment: 'node',  // Node environment for integration tests
    testMatch: ['**/*.integration.test.[jt]s?(x)'],  // Matches *.integration.test.js files
    roots: ['<rootDir>/__tests__/integration'],  // Root directory for integration tests
  };
  