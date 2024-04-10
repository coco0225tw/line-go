'use client';
import { useRef } from 'react';
import { FormWrapper } from './style';
import { Button, ButtonTheme1 } from './../button/index';

export default function Form() {
  const airportInput = '桃園國際機場 第一航廈';
  const airlineIdRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const phoneNumberRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLDivElement>(null);
  // const formRefs = { airlineIdRef, nameRef, phoneNumberRef, idRef };

  // const submit = () => {

  // };
  const formError = {
    airlineId: true,
    name: true,
    phoneNumber: true,
    id: true,
  };

  return (
    <FormWrapper>
      <div className="title">送機行程</div>
      <div className="subTitle">送機計畫</div>
      <div className="form_item">下車機場</div>
      <div className="input" id="airport">
        {airportInput}
      </div>
      <div className="form_item">航班編號</div>
      <div className={`input ${formError.airlineId && 'error'}`} contentEditable ref={airlineIdRef} id="airlineId" />
      <div className="subTitle">旅客資訊</div>
      <div className="form_item">姓名</div>
      <div className={`input ${formError.name && 'error'}`} contentEditable ref={nameRef} id="name" />
      <div className="form_item">電話</div>
      <div
        className={`input ${formError.phoneNumber && 'error'}`}
        contentEditable
        ref={phoneNumberRef}
        id="phoneNumber"
      />
      <div className="form_item" ref={idRef}>
        身分證字號/護照編號
      </div>
      <div contentEditable className="input" id="id" />
      <div className="form_item">乘車備註</div>
      <div className={`input ${formError.id && 'error'}`} contentEditable id="remark" />
      <Button theme={ButtonTheme1.Dark} message="下一步" submitFun={() => {}} />
    </FormWrapper>
  );
}
