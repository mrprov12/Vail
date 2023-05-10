module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
    moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    coveragePathIgnorePatterns: ['/node_modules/'],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.test.{js,jsx,ts,tsx}'],
    coverageDirectory: '<rootDir>/coverage',
    setupFilesAfterEnv: ['./jest.setup.js'],
  };