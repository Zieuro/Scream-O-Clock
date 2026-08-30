const { withProjectBuildGradle } = require("@expo/config-plugins");

const MAVEN_LINE = `maven { url "$rootDir/../node_modules/@notifee/react-native/android/libs" }`;

module.exports = function withNotifeeMaven(config) {
  return withProjectBuildGradle(config, (config) => {
    const { contents } = config.modResults;
    // No-op if already present — makes prebuild re-runnable.
    if (!contents.includes("node_modules/@notifee/react-native")) {
      config.modResults.contents = contents.replace(
        /allprojects\s*\{\s*repositories\s*\{/,
        (match) => `${match}\n        ${MAVEN_LINE}`,
      );
    }
    return config;
  });
};