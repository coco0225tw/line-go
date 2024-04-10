'use client';
import { useRef, useState, RefObject } from 'react';
import { FormWrapper } from './style';
import { Button, ButtonTheme1 } from './../button/index';

export default function Form() {
  const airportInput = '桃園國際機場 第一航廈';
  const airlineIdRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const phoneNumberRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLDivElement>(null);
  const [formError, setFormError] = useState({
    airlineId: false,
    name: false,
    phoneNumber: false,
    id: false,
  });
  const airlineIdRegex = new RegExp('[^A-Za-z0-9]+');
  const nameRegex = new RegExp('[^A-Za-z ]+');
  const phoneNumberRegex = new RegExp('[0-9]+');
  const idRegex = new RegExp('[^A-Z0-9]+');

  const submit = () => {
    //todo callApi
  };
  const action = () => {
    if (checkForm()) {
      submit();
    } else {
      //todo show error popup
    }
  };
  const checkForm = () => {
    const checkAirlineId = airlineIdRegex.test(modifyTypeToString(airlineIdRef));
    const checkName = nameRegex.test(modifyTypeToString(nameRef));
    const checkPhoneNumber = phoneNumberRegex.test(modifyTypeToString(phoneNumberRef));
    const checkId = idRegex.test(modifyTypeToString(idRef));
    setFormError({
      ...formError,
      airlineId: checkAirlineId,
      name: checkName,
      phoneNumber: checkPhoneNumber,
      id: checkId,
    });
    if (!checkAirlineId || !checkName || !checkPhoneNumber || !checkId) {
      return false;
    }
    return true;
  };
  const modifyTypeToString = (inputRef: RefObject<HTMLDivElement>) => {
    const inputValue = inputRef?.current?.textContent;
    return inputValue ? inputValue : '';
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
      <Button theme={ButtonTheme1.Dark} message="下一步" submitFun={action} />
    </FormWrapper>
  );
}
