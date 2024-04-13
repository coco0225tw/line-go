import { ClosePopUpType } from '@/app/utils/enum';
import { create } from 'zustand';
import { PopUpState } from './interface';

export const usePopUpStore = create<PopUpState>((set, get) => ({
  popUpType: ClosePopUpType.NONE,
  isVisible: () => {
    return get().popUpType !== ClosePopUpType.NONE;
  },
  showPopUp: (payload) => set({ popUpType: payload }),
  closePopUp: () => set({ popUpType: ClosePopUpType.NONE }),
}));
