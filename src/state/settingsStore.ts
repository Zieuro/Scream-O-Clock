import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Role, RoleType, Venue } from "@/domain/types";

interface SettingState {
  //state
  venue: Venue;
  roleType: RoleType;
  role: Role;
  numFormat: boolean;

  //actions
  setVenue: (venue: Venue) => void;
  setRoleType: (roleType: RoleType) => void;
  setRole: (role: Role) => void;
  setNumFormat: (numFormat: boolean) => void;
}

export const useSettingsStore = create<SettingState>()(
  persist(
    (set) => ({
      venue: "house",
      roleType: "normal",
      role: "a",
      numFormat: false,

      setVenue: (venue) => set({ venue }),
      setRoleType: (roleType) => set({ roleType }),
      setRole: (role) => set({ role }),
      setNumFormat: (numFormat) => set({ numFormat }),
    }),
    {
      name: "scream-o-clock-settings",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
