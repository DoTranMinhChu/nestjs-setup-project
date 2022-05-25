const { paths } = require('./tsconfig.json').compilerOptions;

const resolveAbsolutePaths = () => {
  const aliases = {};
  Object.keys(paths).forEach((key) => {
    const newKey = key.replace('/*', '/(.*)');
    const newPath = paths[key][0].replace('/*', '/$1');
    aliases[newKey] = '<rootDir>/' + newPath;
  });
  return aliases;
};

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/test'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: resolveAbsolutePaths(),
};
