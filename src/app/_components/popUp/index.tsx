import { PopUpWrapper, SuccessPopUpWrapper, ErrorPopUpWrapper } from './style';
import { Button } from '../button';
import Image from 'next/image';
import checkImg from './../../../../public/check-circle.svg';
import { usePopUpStore } from '@/app/lib/popUp/store';
import { ShowPopUpType } from '@/app/utils/enum';
import { useUserStore } from '@/app/lib/user/store';
import { ButtonTheme } from '@/app/utils/enum';
export default function PopUp() {
  const { popUpType, isVisible } = usePopUpStore((state) => state);
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
  const { closePopUp, showPopUp } = usePopUpStore((state) => state);
  const { userPlane } = useUserStore((state) => state);
  return (
    <ErrorPopUpWrapper>
      <div className="title">{`查不到「${userPlane}」的航班資訊`}</div>
      <div className="message">請確認航班資訊、起飛時間等，你也可以填寫此航班作為機場接送資訊。</div>
      <Button
        theme={ButtonTheme.Dark}
        message="確認航班資訊，並送出"
        action={() => {
          showPopUp(ShowPopUpType.SUCCESS);
        }}
      />
      <Button theme={ButtonTheme.Light} message="重新填寫" action={closePopUp} />
    </ErrorPopUpWrapper>
  );
}
