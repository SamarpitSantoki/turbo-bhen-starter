import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GlobalStore {
  showActionsheet: boolean;
  setShowActionsheet: (showActionsheet: boolean) => void;
  keyboardDidShow: boolean;
  setKeyboardDidShow: (keyboardDidShow: boolean) => void;
}

const initialState: GlobalStore = {
  showActionsheet: false,
  setShowActionsheet: () => {},
  keyboardDidShow: false,
  setKeyboardDidShow: () => {},
};

const useGlobalStore = create<GlobalStore>()(
  persist(
    (set) => ({
      ...initialState,
      setShowActionsheet: (showActionsheet) => set({ showActionsheet }),
      setKeyboardDidShow: (keyboardDidShow) => set({ keyboardDidShow }),
    }),
    {
      name: "global-store",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage(state) {
        return (state) => {
          if (state?.showActionsheet) {
            state.setShowActionsheet(false);
          }
          if (state?.keyboardDidShow) {
            state.setKeyboardDidShow(false);
          }
        };
      },
    }
  )
);

export default useGlobalStore;
