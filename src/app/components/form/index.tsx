import React, { ReactNode, useRef } from 'react';
import { FormWrapper, Title, SubTitle, Input } from './style';
import { Button } from './../button/index';
import { useSearchPlane } from '@/app/lib/searchPlane/hook';
import { useUserStore } from '@/app/lib/user/store';
import { ButtonTheme } from '@/app/utils/enum';
import { useForm } from '@/app/lib/form/hook';
interface InputProps {
  contentEditable: boolean;
  ref?: React.RefObject<HTMLDivElement>;
  notValidated: boolean;
  preventEnter: boolean;
  inputValue?: string;
  id: string;
}

function SubForm({ children }: { children: ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}

function InputBox({ props }: { props: InputProps }) {
  const preventNextLine = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  const { id, contentEditable, ref, notValidated, preventEnter, inputValue } = props;
  return (
    <Input
      contentEditable={contentEditable}
      ref={ref}
      className={`input ${notValidated && 'error'}`}
      id={id}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => preventEnter && preventNextLine(e)}
    >
      {inputValue}
    </Input>
  );
}

export default function Form() {
  const { searchPlane } = useSearchPlane();
  const { setUserPlane } = useUserStore();
  const { validatedResult, isFormValidated, formValidate } = useForm();
  const airportInput = '桃園國際機場 第一航廈';
  const airlineIdRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const phoneNumberRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLDivElement>(null);
  const refs = { airlineIdRef: airlineIdRef, nameRef: nameRef, phoneNumberRegex: phoneNumberRef, idRef: idRef };

  const action = () => {
    validatedResult(refs);
    if (isFormValidated()) {
      const userAirline = airlineIdRef?.current?.textContent;
      setUserPlane(userAirline as string);
      searchPlane(userAirline as string);
    }
  };

  const airportProps: InputProps = {
    inputValue: airportInput,
    contentEditable: false,
    notValidated: false,
    preventEnter: false,
    id: 'airport',
  };
  const airlineIdProps: InputProps = {
    contentEditable: true,
    ref: airlineIdRef,
    notValidated: !formValidate.airlineId,
    preventEnter: true,
    id: 'airlineId',
  };

  const nameProps: InputProps = {
    contentEditable: true,
    ref: nameRef,
    notValidated: !formValidate.name,
    preventEnter: true,
    id: 'name',
  };
  const phoneNUmberProps: InputProps = {
    contentEditable: true,
    ref: phoneNumberRef,
    notValidated: !formValidate.phoneNumber,
    preventEnter: true,
    id: 'phoneNumber',
  };
  const idProps: InputProps = {
    contentEditable: true,
    ref: idRef,
    notValidated: !formValidate.id,
    preventEnter: true,
    id: 'id',
  };
  const remarkProps: InputProps = {
    contentEditable: true,
    notValidated: false,
    preventEnter: false,
    id: 'remark',
  };

  return (
    <FormWrapper>
      <div className="title">送機行程</div>
      <SubForm>
        <Title>送機計畫</Title>
        <SubTitle>下車機場</SubTitle>
        <InputBox props={airportProps} />
        <SubTitle>航班編號</SubTitle>
        <InputBox props={airlineIdProps} />
      </SubForm>
      <SubForm>
        <Title>旅客資訊</Title>
        <SubTitle>姓名</SubTitle>
        <InputBox props={nameProps} />
        <SubTitle>電話</SubTitle>
        <InputBox props={phoneNUmberProps} />
        <SubTitle>身分證字號/護照編號</SubTitle>
        <InputBox props={idProps} />
        <SubTitle>乘車備註</SubTitle>
        <InputBox props={remarkProps} />
      </SubForm>
      <Button theme={ButtonTheme.Dark} message="下一步" action={action} />
    </FormWrapper>
  );
}
