import { PopUpType, ShowPopUpType } from '@/utils/enum';

export interface PopUpState {
  popUpType: PopUpType;
  isVisible: () => boolean;
  showPopUp: (payload: ShowPopUpType) => void;
  closePopUp: () => void;
}
