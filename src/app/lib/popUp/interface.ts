import { PopUpType } from '@/app/enum';

export interface PopUpState {
  popUpType: PopUpType;
  isVisible: boolean;
  showPopUp: (popUpType: PopUpType) => void;
  closePopUp: () => void;
}
