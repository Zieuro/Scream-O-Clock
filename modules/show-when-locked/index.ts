import { requireOptionalNativeModule } from "expo";

// Android-only native module: null on other platforms, so callers must
// guard with Platform.OS before use.
export default requireOptionalNativeModule("ShowWhenLocked") as {
  setShowWhenLocked(enabled: boolean): void;
} | null;
