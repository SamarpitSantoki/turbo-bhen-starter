import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@repo/core/types/entities/user";

interface AuthStore {
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
  email: string;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setOnboardingCompleted: (onboardingCompleted: boolean) => void;
  authenticate: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const initialState = {
  email: "",
  isAuthenticated: false,
  onboardingCompleted: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setOnboardingCompleted: (onboardingCompleted) =>
        set({ onboardingCompleted }),
      authenticate: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true }),
      logout: () => set({ ...initialState }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;