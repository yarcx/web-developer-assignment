export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  moduleNameMapping: {
    "^@/(.*)$": "./src/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
