module.exports = {
  verbose: true,
  preset: 'react-native',
  setupFilesAfterEnv: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '@testing-library/jest-native/extend-expect',
  ],
  transform: {
    '^.+\\.(js|jsx|mjs|tsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-native-community/google-signin|@ui-kitten/components|@react-native-community/async-storage/(?!(lib))|@react-navigation/.*)',
  ],
  setupFiles: [
    '<rootDir>/jest.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  testRegex: '((\\.|/)(test|spec))\\.[jt]sx?$',
}
