module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
    "\\.(less)$": "identity-obj-proxy",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@img/(.*)$": "<rootDir>/mocks/fileMock.js",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@stores/(.*)$": "<rootDir>/src/stores/$1",
    "^@type/(.*)$": "<rootDir>/src/types/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
