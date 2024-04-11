import { PopUpType } from '@/app/enum';
import { create } from 'zustand';
import { PopUpState } from './interface';

export const usePopUpStore = create<PopUpState>((set) => ({
  popUpType: PopUpType.ERROR,
  isVisible: false,
  showPopUp: (type) => set(() => ({ isVisible: true, popUpType: type })),
  closePopUp: () => set(() => ({ isVisible: false })),
}));
