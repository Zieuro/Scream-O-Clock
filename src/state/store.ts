import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Show, Slot } from "@/domain/types";
import { buildSlots } from "@/domain/slots";
import { buildTodaysShow } from "@/domain/show";
import {
  scheduleSlotNotifications,
  cancelAllNotifications,
} from "@/services/notifications";
import { fetchConfig, default_config } from "@/services/config";
import { fetchRows } from "@/services/assignments";
import { ensureChannel, requestPermissions } from "@/services/notifications";
import notifee from "@notifee/react-native";
import { useSettingsStore } from "./settingsStore";

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
  arm: () => Promise<void>;
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
      },
      arm: async () => {
        const { slots } = get();
        const { now } = get();
        if (slots.length === 0) return;

        await ensureChannel();

        const granted = await requestPermissions();
        if (!granted) return;

        await scheduleSlotNotifications(slots, now);
        const ids = await notifee.getTriggerNotificationIds();
        set({ armed: true });
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
