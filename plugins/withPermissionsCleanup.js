const { withAndroidManifest } = require("expo/config-plugins");

// Expo's base template merges permissions this app never uses. Declared
// permissions surface in Play's data review and the system app-info UI, so
// strip them at merge time with tools:node="remove" — honored by the
// manifest merger no matter which library injects them.
// READ_MEDIA_* are injected by @harkenapp/sdk-react-native's config plugin,
// but Google Play's photo/video permissions policy forbids them for apps
// targeting API 33+ — expo-image-picker uses the permissionless system photo
// picker there, so removing them breaks nothing.
const STRIP = [
  "android.permission.SYSTEM_ALERT_WINDOW",
  "android.permission.RECORD_AUDIO",
  "android.permission.READ_MEDIA_IMAGES",
  "android.permission.READ_MEDIA_VIDEO",
  "android.permission.READ_MEDIA_VISUAL_USER_SELECTED",
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
