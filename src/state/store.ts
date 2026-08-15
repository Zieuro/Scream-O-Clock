import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Show, Slot } from "@/src/domain/types";
import { buildSlots } from "@/src/domain/slots";
import { buildTodaysShow } from "@/src/domain/show";
import { scheduleSlotNotifications, cancelAllNotifications } from "@/src/services/notifications";
import { fetchConfig, default_config } from "@/src/services/config";
import { fetchRows } from "@/src/services/assignments";

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
  arm: () => void;
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
        const config_response = await fetchConfig();
        const config = config_response ?? default_config;

        const rows = await fetchRows();

        const show = buildTodaysShow(date, config);
        if (show != null) {
          set({ show: show, slots: buildSlots(show, rows) });
        } else {
          set({ show: null, slots: [] });
        }
      },
      arm: () => {
        const { slots } = get();
        if (slots.length > 0) {
          scheduleSlotNotifications(slots);
          set({ armed: true });
        }
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
