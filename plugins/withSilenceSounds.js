const fs = require("fs");
const path = require("path");
const { withDangerousMod, withXcodeProject } = require("expo/config-plugins");

// Silence assets referenced by native alarm/notification sound lookups
// (AlarmKit AlertSound.named and Notifee ios.sound), which resolve against
// the app bundle rather than Metro's JS asset store.
const SOUND_FILES = ["silence.mp3", "silence.caf"];

const withSilenceSounds = (config) => {
  config = withDangerousMod(config, [
    "ios",
    (cfg) => {
      const srcDir = path.join(cfg.modRequest.projectRoot, "assets", "sounds");
      const destDir = path.join(
        cfg.modRequest.platformProjectRoot,
        cfg.modRequest.projectName
      );
      fs.mkdirSync(destDir, { recursive: true });
      for (const file of SOUND_FILES) {
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
      }
      return cfg;
    },
  ]);

  config = withXcodeProject(config, (cfg) => {
    const xcodeProject = cfg.modResults;
    // The xcode lib's addResourceFile resolves paths against a "Resources"
    // group, which Expo prebuild projects don't have, so create an empty one
    // to keep the lookup from crashing.
    if (!xcodeProject.pbxGroupByName("Resources")) {
      xcodeProject.pbxCreateGroup("Resources");
    }
    for (const file of SOUND_FILES) {
      xcodeProject.addResourceFile(
        path.join(cfg.modRequest.projectName, file)
      );
    }
    return cfg;
  });

  return config;
};

module.exports = withSilenceSounds;
