import { create } from 'zustand';
import { UserState } from './interface';

export const useUserStore = create<UserState>((set) => ({
  userPlane: '',
  setUserPlane: (payload) => set({ userPlane: payload }),
}));
