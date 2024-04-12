import { PopUpType } from '@/utils/enum';
import { create } from 'zustand';
import { SearchPlaneState } from './interface';

export const useSearchPlaneStore = create<SearchPlaneState>((set) => ({
  isSearchWaiting: false,
  lastModifiedTime: new Date(0).toUTCString(),
  searchPlanes: [],
  setLastModifiedTime: (payload) => set({ lastModifiedTime: payload }),
  setIsSearchWaiting: (payload) => set({ isSearchWaiting: payload }),
  setSearchPlanes: (payload) => set({ searchPlanes: payload }),
}));
