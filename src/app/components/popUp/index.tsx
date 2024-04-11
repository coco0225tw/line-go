import { PopUpWrapper, SuccessPopUpWrapper, ErrorPopUpWrapper } from './style';
import { Button, ButtonTheme1 } from '../button';
import Image from 'next/image';
import checkImg from './../../../../public/check-circle.svg';
import { usePopUpStore } from '@/app/lib/popUp/store';
import { ShowPopUpType } from '@/app/enum';
import { useUserStore } from '@/app/lib/user/store';

export default function PopUp() {
  const { popUpType, isVisible } = usePopUpStore();
  const isErrorPopUpVisible = popUpType === ShowPopUpType.ERROR;
  const isSuccessPopUpVisible = popUpType === ShowPopUpType.SUCCESS;
  return (
    <PopUpWrapper $isVisible={isVisible()}>
      {isSuccessPopUpVisible ? <SuccessPopup /> : isErrorPopUpVisible && <ErrorPopup />}
    </PopUpWrapper>
  );
}

function SuccessPopup() {
  return (
    <SuccessPopUpWrapper>
      <Image src={checkImg} width={70} height={70} alt="Picture of the author" />
      <div className="message">完成送機行程</div>
    </SuccessPopUpWrapper>
  );
}

function ErrorPopup() {
  const { closePopUp, showPopUp } = usePopUpStore();
  const { userPlane } = useUserStore();
  return (
    <ErrorPopUpWrapper>
      <div className="title">{`查不到「${userPlane}」的航班資訊`}</div>
      <div className="message">請確認航班資訊、起飛時間等，你也可以填寫此航班作為機場接送資訊。</div>
      <Button
        theme={ButtonTheme1.Dark}
        message="確認航班資訊，並送出"
        submitFun={() => {
          showPopUp(ShowPopUpType.SUCCESS);
        }}
      />
      <Button theme={ButtonTheme1.Light} message="重新填寫" submitFun={closePopUp} />
    </ErrorPopUpWrapper>
  );
}
