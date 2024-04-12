import { PopUpType, ShowPopUpType } from '@/app/utils/enum';

export interface PopUpState {
  popUpType: PopUpType;
  isVisible: () => boolean;
  showPopUp: (payload: ShowPopUpType) => void;
  closePopUp: () => void;
}
