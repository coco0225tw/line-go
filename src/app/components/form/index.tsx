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
  const [formValidate, setFormValidate] = useState({
    airlineId: true,
    name: true,
    phoneNumber: true,
    id: true,
  });
  const airlineIdRegex = new RegExp('^[A-Za-z\\d]+$');
  const nameRegex = new RegExp('^[A-Za-z\\s]+[A-Za-z]+[A-Za-z\\s]$');
  const phoneNumberRegex = new RegExp('^[\\d]+$');
  const idRegex = new RegExp('^[A-Z\\d]+$');

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
    const checkAirlineId = checkValue(airlineIdRef, airlineIdRegex);
    const checkName = checkValue(nameRef, nameRegex);
    const checkPhoneNumber = checkValue(phoneNumberRef, phoneNumberRegex);
    const checkId = checkValue(idRef, idRegex);

    setFormValidate({
      ...formValidate,
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

  const checkValue = (inputRef: RefObject<HTMLDivElement>, regex: RegExp) => {
    const inputValue = inputRef?.current?.textContent;

    function isDefined<T>(val: T | undefined | null): val is T {
      return val !== undefined && val !== null;
    }
    if (isDefined(inputValue)) return regex.test(inputValue);
    return false;
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
      <div
        className={`input ${!formValidate.airlineId && 'error'}`}
        contentEditable
        ref={airlineIdRef}
        id="airlineId"
      />
      <div className="subTitle">旅客資訊</div>
      <div className="form_item">姓名</div>
      <div className={`input ${!formValidate.name && 'error'}`} contentEditable ref={nameRef} id="name" />
      <div className="form_item">電話</div>
      <div
        className={`input ${!formValidate.phoneNumber && 'error'}`}
        contentEditable
        ref={phoneNumberRef}
        id="phoneNumber"
      />
      <div className="form_item">身分證字號/護照編號</div>
      <div contentEditable ref={idRef} className={`input ${!formValidate.id && 'error'}`} id="id" />
      <div className="form_item">乘車備註</div>
      <div contentEditable id="remark" />
      <Button theme={ButtonTheme1.Dark} message="下一步" submitFun={action} />
    </FormWrapper>
  );
}
