import { PopUpWrapper, SuccessPopUpWrapper, ErrorPopUpWrapper } from './style';
import { Button, ButtonTheme1 } from '../button';
import Image from 'next/image';
import checkImg from './../../../../public/check-circle.svg';
export default function PopUp() {
  return (
    <PopUpWrapper>
      <SuccessPopup />
      <ErrorPopup />
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
  const airline = '123';
  return (
    <ErrorPopUpWrapper>
      <div className="title">{`查不到「${airline}」的航班資訊`}</div>
      <div className="message">請確認航班資訊、起飛時間等，你也可以填寫此航班作為機場接送資訊。</div>
      <Button theme={ButtonTheme1.Dark} message="確認航班資訊，並送出" submitFun={() => {}} />
      <Button theme={ButtonTheme1.Light} message="重新填寫" submitFun={() => {}} />
    </ErrorPopUpWrapper>
  );
}
