const { withAndroidManifest } = require("expo/config-plugins");

// When the alarm's full-screen intent fires over the lock screen, Android
// only lets an activity wake the display and draw over the keyguard if it
// opts in per-activity. Without these flags the alarm launches MainActivity
// behind the lock screen while the notification keeps ringing.
const withAlarmScreenUnlock = (config) => {
  return withAndroidManifest(config, (cfg) => {
    const activities = cfg.modResults.manifest.application?.[0]?.activity;
    if (!activities) return cfg;
    for (const activity of activities) {
      const name = activity?.$?.["android:name"];
      if (name === ".MainActivity" || name?.endsWith(".MainActivity")) {
        activity.$["android:showWhenLocked"] = "true";
        activity.$["android:turnScreenOn"] = "true";
      }
    }
    return cfg;
  });
};

module.exports = withAlarmScreenUnlock;
