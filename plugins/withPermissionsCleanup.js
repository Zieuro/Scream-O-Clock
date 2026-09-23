const { withAndroidManifest } = require("expo/config-plugins");

// Expo's base template merges permissions this app never uses. Declared
// permissions surface in Play's data review and the system app-info UI, so
// strip them at merge time with tools:node="remove" — honored by the
// manifest merger no matter which library injects them.
const STRIP = [
  "android.permission.SYSTEM_ALERT_WINDOW",
  "android.permission.RECORD_AUDIO",
];

const withPermissionsCleanup = (config) => {
  return withAndroidManifest(config, (cfg) => {
    const root = cfg.modResults.manifest.$;
    root["xmlns:tools"] =
      root["xmlns:tools"] ?? "http://schemas.android.com/tools";
    const list = cfg.modResults.manifest["uses-permission"] ?? [];
    for (const name of STRIP) {
      // Mutate in place — appending a duplicate entry gets deduped away by
      // the serializer, which keeps the first entry for a given name.
      const existing = list.find((p) => p.$?.["android:name"] === name);
      if (existing) {
        existing.$["tools:node"] = "remove";
      } else {
        list.push({ $: { "android:name": name, "tools:node": "remove" } });
      }
    }
    cfg.modResults.manifest["uses-permission"] = list;
    return cfg;
  });
};

module.exports = withPermissionsCleanup;
