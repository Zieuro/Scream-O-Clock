package expo.modules.showwhenlocked

import android.app.Activity
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

// Runtime override for the MainActivity manifest flags. The manifest sets
// showWhenLocked/turnScreenOn to true because the alarm's full-screen intent
// needs them on a cold start; this module lets the user's "show on lock
// screen" preference turn them off for the running activity, and lets the
// ring force them back on.
class ShowWhenLockedModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ShowWhenLocked")

    Function("setShowWhenLocked") { enabled: Boolean ->
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
        val activity: Activity? = appContext.currentActivity
        activity?.setShowWhenLocked(enabled)
        activity?.setTurnScreenOn(enabled)
      }
    }
  }
}
