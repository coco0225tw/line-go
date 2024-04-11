import { PopUpType, ShowPopUpType } from '@/app/enum';

export interface PopUpState {
  popUpType: PopUpType;
  isVisible: () => boolean;
  showPopUp: (payload: ShowPopUpType) => void;
  closePopUp: () => void;
}
