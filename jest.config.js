module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    coveragePathIgnorePatterns: ['/node_modules/'],
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/**/*.test.{js,jsx}'],
    coverageDirectory: '<rootDir>/coverage',
    setupFilesAfterEnv: ['./jest.setup.js'],
  };