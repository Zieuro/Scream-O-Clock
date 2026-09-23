import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler, Platform } from "react-native";
import { Show, Slot } from "@/domain/types";
import { buildSlots } from "@/domain/slots";
import { buildActiveShow } from "@/domain/show";
import {
  scheduleSlotNotifications,
  cancelAllNotifications,
  ensureChannel,
  requestPermissions,
  ensureExactAlarmsEnabled,
  hasOemPowerManager,
} from "@/services/notifications";
import { fetchConfig, default_config } from "@/services/config";
import { fetchRows, fetchSpecialtyRows } from "@/services/assignments";
import { useSettingsStore } from "./settingsStore";

export type ArmResult =
  | { ok: true; scheduled: number; powerManager: boolean }
  | {
      ok: false;
      reason: "no-slots" | "permission-denied" | "alarms-disabled";
    };

interface AppState {
  //state
  now: number;
  show: Show | null;
  slots: Slot[];
  armed: boolean;
  ringingSlot: string | null;
  // How the current ring started: true when the alarm launched/surfaced the
  // app itself (full-screen intent over the lock screen), false when the user
  // was already in the app. Decides where Stop should return to.
  alarmFromLaunch: boolean;
  showBuiltFor: string | null;
  hydrated: boolean;

  //actions
  tick: (now: number) => void;
  loadShow: (date: Date) => Promise<void>;
  arm: () => Promise<ArmResult>;
  disarm: () => void;
  startRingingSlot: (slotId: string, fromLaunch: boolean) => void;
  stopRingingSlot: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      now: Date.now(),
      show: null,
      slots: [],
      armed: false,
      ringingSlot: null,
      alarmFromLaunch: false,
      showBuiltFor: null,
      hydrated: false,

      tick: (now) => set({ now }),
      loadShow: async (date) => {
        // const config_response = await fetchConfig();
        // const config = config_response ?? default_config;
        const config = default_config;
        const roleType = useSettingsStore.getState().roleType;
        const rows =
          roleType === "standard"
            ? await fetchRows()
            : await fetchSpecialtyRows();
        const role = useSettingsStore.getState().role;

        /* In case yesterday's show is null during post-show hours,
          this will manually create yesterday's show. After yesterday's
          clearTime (e.g. 2am), it rolls forward to today's show instead,
          otherwise the <3am window would show No Show until 3am. */
        const show = buildActiveShow(date, config, role);

        /* no-show days keep the previously built show
          getPhase still returns null past clear time */
        if (show != null) {
          set({ show: show, slots: buildSlots(show, rows) });
        }

        cancelAllNotifications();
        set({ armed: false, showBuiltFor: date.toDateString() });
      },
      arm: async () => {
        const { slots } = get();
        const { now } = get();
        if (slots.length === 0) return { ok: false, reason: "no-slots" };

        await ensureChannel();

        const granted = await requestPermissions();
        if (!granted) return { ok: false, reason: "permission-denied" };

        if (!(await ensureExactAlarmsEnabled())) {
          return { ok: false, reason: "alarms-disabled" };
        }

        const scheduled = await scheduleSlotNotifications(slots, now);
        set({ armed: true });
        return {
          ok: true,
          scheduled,
          powerManager: await hasOemPowerManager(),
        };
      },
      disarm: () => {
        cancelAllNotifications();
        set({ armed: false });
      },
      stopRingingSlot: () => {
        const fromLaunch = get().alarmFromLaunch;
        set({ ringingSlot: null, alarmFromLaunch: false });
        // The alarm launched the app over the lock screen (or surfaced it
        // from the background): like the stock clock, stopping returns to
        // whatever was on screen before — not deeper into the app.
        if (fromLaunch && Platform.OS === "android") {
          BackHandler.exitApp();
        }
      },
      startRingingSlot: (slotId, fromLaunch) =>
        set((s) => ({
          ringingSlot: slotId,
          // Don't downgrade an in-app ring to a launch ring if a stale
          // displayed-notification check re-fires mid-ring.
          alarmFromLaunch: s.ringingSlot ? s.alarmFromLaunch : fromLaunch,
        })),
    }),
    {
      name: "scream-o-clock-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        show: state.show,
        slots: state.slots,
        armed: state.armed,
        showBuiltFor: state.showBuiltFor,
      }),
      onRehydrateStorage: () => () => {
        useAppStore.setState({ hydrated: true });
      },
    },
  ),
);
