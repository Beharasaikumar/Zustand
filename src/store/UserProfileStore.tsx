import { create } from "zustand";


interface GenericState<T> {
  step: number;
  profile: Partial<T>;
  nextStep: () => void;
  prevStep: () => void;
  updateProfile: (profile: Partial<T>) => void;
  reset: () => void;
}

export const createGenericStore = <T extends object>() =>
  create<GenericState<T>>((set) => ({
    step: 1,
    profile: {},
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),
    updateProfile: (data) =>
      set((state) => ({
        profile: { ...state.profile, ...data },
      })),
    reset: () =>
      set({
        step: 1,
        profile: {},
      }),
  }));

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
}

export const UserProfileStore = createGenericStore<Profile>();
