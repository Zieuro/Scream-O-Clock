const { withAndroidManifest } = require("expo/config-plugins");

const PERMISSION = "android.permission.SCHEDULE_EXACT_ALARM";

// USE_EXACT_ALARM only exists from Android 13 (API 33). Android 12 needs
// SCHEDULE_EXACT_ALARM, capped at SDK 32 so the app never declares both
// uncapped on 33+ (a Google Play policy violation for alarm apps).
const withExactAlarmPermission = (config) => {
  return withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults;
    const list = manifest.manifest["uses-permission"] || [];
    if (!list.some((p) => p.$ && p.$["android:name"] === PERMISSION)) {
      list.push({
        $: {
          "android:name": PERMISSION,
          "android:maxSdkVersion": "32",
        },
      });
      manifest.manifest["uses-permission"] = list;
    }
    return cfg;
  });
};

module.exports = withExactAlarmPermission;
