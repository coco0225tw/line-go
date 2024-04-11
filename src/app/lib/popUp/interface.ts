import { PopUpType } from '@/app/enum';

export interface PopUpState {
  popUpType: PopUpType;
  isVisible: boolean;
  showPopUp: (payload: PopUpType) => void;
  closePopUp: () => void;
}
