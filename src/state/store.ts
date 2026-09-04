import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Show, Slot } from "@/domain/types";
import { buildSlots } from "@/domain/slots";
import { buildTodaysShow } from "@/domain/show";
import {
  scheduleSlotNotifications,
  cancelAllNotifications,
  ensureChannel,
  requestPermissions,
} from "@/services/notifications";
import { fetchConfig, default_config } from "@/services/config";
import { fetchRows } from "@/services/assignments";
import { useSettingsStore } from "./settingsStore";

export type ArmResult =
  | { ok: true; scheduled: number }
  | { ok: false; reason: "no-slots" | "permission-denied" };

interface AppState {
  //state
  now: number;
  show: Show | null;
  slots: Slot[];
  armed: boolean;
  ringingSlot: string | null;

  //actions
  tick: (now: number) => void;
  loadShow: (date: Date) => Promise<void>;
  arm: () => Promise<ArmResult>;
  disarm: () => void;
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

      tick: (now) => set({ now }),
      loadShow: async (date) => {
        // const config_response = await fetchConfig();
        // const config = config_response ?? default_config;
        const config = default_config;
        const rows = await fetchRows();
        const role = useSettingsStore.getState().role;

        const show = buildTodaysShow(date, config, role);
        if (show != null) {
          set({ show: show, slots: buildSlots(show, rows) });
        } else {
          set({ show: null, slots: [] });
        }
        cancelAllNotifications();
        set({ armed: false });
      },
      arm: async () => {
        const { slots } = get();
        const { now } = get();
        if (slots.length === 0) return { ok: false, reason: "no-slots" };

        await ensureChannel();

        const granted = await requestPermissions();
        if (!granted) return { ok: false, reason: "permission-denied" };

        const scheduled = await scheduleSlotNotifications(slots, now);
        set({ armed: true });
        return { ok: true, scheduled };
      },
      disarm: () => {
        cancelAllNotifications();
        set({ armed: false });
      },
      stopRingingSlot: () => set({ ringingSlot: null }),
    }),
    {
      name: "scream-o-clock-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        show: state.show,
        slots: state.slots,
        armed: state.armed,
      }),
    },
  ),
);