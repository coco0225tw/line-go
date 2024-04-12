'use client';
import { useRef, useState, RefObject } from 'react';
import { FormWrapper } from './style';
import { Button } from './../button/index';
import { useSearchPlane } from '@/app/lib/searchPlane/hook';
import { useUserStore } from '@/app/lib/user/store';
import { FormValidateState } from '@/app/lib/form/interface';
import { ButtonTheme } from '@/app/utils/enum';

export default function Form() {
  const { searchPlane } = useSearchPlane();
  const { setUserPlane } = useUserStore();
  const airportInput = '桃園國際機場 第一航廈';
  const airlineIdRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const phoneNumberRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLDivElement>(null);

  const [formValidate, setFormValidate] = useState<FormValidateState>({
    airlineId: true,
    name: true,
    phoneNumber: true,
    id: true,
  });
  const airlineIdRegex = new RegExp('^[A-Za-z\\d]+$');
  const nameRegex = new RegExp('^[a-zA-Z\\s]*[a-zA-Z]+[a-zA-Z\\s]*$');
  const phoneNumberRegex = new RegExp('^[\\d]+$');
  const idRegex = new RegExp('^[A-Z\\d]+$');

  const action = () => {
    const result = validatedResult();
    if (isFormValidated(result)) {
      const userAirline = airlineIdRef?.current?.textContent;
      setUserPlane(userAirline as string);
      searchPlane(userAirline as string);
    } else {
      setFormValidate(result);
    }
  };
  const validatedResult = (): FormValidateState => {
    const checkAirlineId = testRegex(airlineIdRef, airlineIdRegex);
    const checkName = testRegex(nameRef, nameRegex);
    const checkPhoneNumber = testRegex(phoneNumberRef, phoneNumberRegex);
    const checkId = testRegex(idRef, idRegex);
    return {
      airlineId: checkAirlineId,
      name: checkName,
      phoneNumber: checkPhoneNumber,
      id: checkId,
    };
  };

  const isFormValidated = (result: FormValidateState) => {
    for (const isValidated in result) {
      if (!isValidated) {
        return false;
      }
    }
    return true;
  };

  const testRegex = (inputRef: RefObject<HTMLDivElement>, regex: RegExp) => {
    const inputValue = inputRef?.current?.textContent;
    if (isDefined(inputValue)) return regex.test(inputValue);
    return false;
  };

  function isDefined<T>(val: T | undefined | null): val is T {
    return val !== undefined && val !== null;
  }

  const preventNextLine = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
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
        onKeyDown={(e) => preventNextLine(e)}
      />
      <div className="subTitle">旅客資訊</div>
      <div className="form_item">姓名</div>
      <div
        className={`input ${!formValidate.name && 'error'}`}
        contentEditable
        ref={nameRef}
        id="name"
        onKeyDown={(e) => preventNextLine(e)}
      />
      <div className="form_item">電話</div>
      <div
        className={`input ${!formValidate.phoneNumber && 'error'}`}
        contentEditable
        ref={phoneNumberRef}
        id="phoneNumber"
        onKeyDown={(e) => preventNextLine(e)}
      />
      <div className="form_item">身分證字號/護照編號</div>
      <div
        contentEditable
        ref={idRef}
        className={`input ${!formValidate.id && 'error'}`}
        id="id"
        onKeyDown={(e) => preventNextLine(e)}
      />
      <div className="form_item">乘車備註</div>
      <div contentEditable id="remark" />
      <Button theme={ButtonTheme.Dark} message="下一步" submitFun={action} />
    </FormWrapper>
  );
}
