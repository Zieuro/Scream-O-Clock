import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Role, RoleType } from "@/domain/types";

interface SettingState {
  //state
  hasOnboarded: boolean;
  positionView: boolean;
  roleType: RoleType;
  role: Role;
  numFormat: boolean;

  //actions
  setHasOnboarded: (hasOnboarded: boolean) => void;
  setPositionView: (positionView: boolean) => void;
  setRoleType: (roleType: RoleType) => void;
  setRole: (role: Role) => void;
  setNumFormat: (numFormat: boolean) => void;
}

export const useSettingsStore = create<SettingState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      positionView: true, // Option to display positions
      roleType: "standard",
      role: "a",
      numFormat: false,

      setHasOnboarded: (hasOnboarded) => set({ hasOnboarded }),
      setPositionView: (positionView) => set({ positionView }), // Action to toggle, shows by 
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