import { ClosePopUpType } from '@/app/enum';
import { create } from 'zustand';
import { PopUpState } from './interface';

export const usePopUpStore = create<PopUpState>((set, get) => ({
  popUpType: ClosePopUpType.NONE,
  isVisible: () => {
    return get().popUpType !== ClosePopUpType.NONE;
  },
  showPopUp: (type) => set({ popUpType: type }),
  closePopUp: () => set({ popUpType: ClosePopUpType.NONE }),
}));
