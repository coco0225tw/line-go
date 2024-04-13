import React, { useRef } from 'react';
import { FormWrapper, Title, SubTitle, Input } from './style';
import { Button } from './../button/index';
import { useSearchPlane } from '@/app/lib/searchPlane/hook';
import { useUserStore } from '@/app/lib/user/store';
import { ButtonTheme } from '@/app/utils/enum';
import { useForm } from '@/app/lib/form/hook';
import { useFormStore } from '@/app/lib/form/store';
interface InputProps {
  contentEditable: boolean;
  ref?: React.RefObject<HTMLDivElement>;
  preventEnter: boolean;
  inputValue?: string;
  id: string;
}
interface Refs {
  airlineIdRef: React.RefObject<HTMLDivElement>;
  nameRef: React.RefObject<HTMLDivElement>;
  phoneNumberRegex: React.RefObject<HTMLDivElement>;
  idRef: React.RefObject<HTMLDivElement>;
}

function InputBox({ props }: { props: InputProps }) {
  const { form } = useFormStore((state) => state);
  type Key = keyof typeof form;
  const preventNextLine = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  const { id, contentEditable, ref, preventEnter, inputValue } = props;
  const isError = !form[id as Key];
  return (
    <Input
      contentEditable={contentEditable}
      ref={ref}
      className={`input ${isError && 'error'}`}
      id={id}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => preventEnter && preventNextLine(e)}
    >
      {inputValue}
    </Input>
  );
}

function ButtonBox({ refs }: { refs: Refs }) {
  const setUserPlane = useUserStore((state) => state.setUserPlane);
  const { validatedResult, isFormValidated } = useForm();
  const { searchPlane } = useSearchPlane();
  const action = () => {
    const result = validatedResult(refs);
    if (isFormValidated(result)) {
      const userAirline = refs.airlineIdRef?.current?.textContent;
      setUserPlane(userAirline as string);
      searchPlane(userAirline as string);
    }
  };
  return <Button theme={ButtonTheme.Dark} message="下一步" action={action} />;
}

export default function Form() {
  const airportInput = '桃園國際機場 第一航廈';
  const airlineIdRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const phoneNumberRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLDivElement>(null);
  const refs: Refs = { airlineIdRef: airlineIdRef, nameRef: nameRef, phoneNumberRegex: phoneNumberRef, idRef: idRef };
  const airportProps: InputProps = {
    inputValue: airportInput,
    contentEditable: false,
    preventEnter: false,
    id: 'airport',
  };
  const airlineIdProps: InputProps = {
    contentEditable: true,
    ref: airlineIdRef,
    preventEnter: true,
    id: 'airlineId',
  };

  const nameProps: InputProps = {
    contentEditable: true,
    ref: nameRef,
    preventEnter: true,
    id: 'name',
  };
  const phoneNUmberProps: InputProps = {
    contentEditable: true,
    ref: phoneNumberRef,
    preventEnter: true,
    id: 'phoneNumber',
  };
  const idProps: InputProps = {
    contentEditable: true,
    ref: idRef,
    preventEnter: true,
    id: 'id',
  };
  const remarkProps: InputProps = {
    contentEditable: true,
    preventEnter: false,
    id: 'remark',
  };

  return (
    <FormWrapper>
      <div className="title">送機行程</div>
      <>
        <Title>送機計畫</Title>
        <SubTitle>下車機場</SubTitle>
        <InputBox props={airportProps} />
        <SubTitle>航班編號</SubTitle>
        <InputBox props={airlineIdProps} />
      </>
      <>
        <Title>旅客資訊</Title>
        <SubTitle>姓名</SubTitle>
        <InputBox props={nameProps} />
        <SubTitle>電話</SubTitle>
        <InputBox props={phoneNUmberProps} />
        <SubTitle>身分證字號/護照編號</SubTitle>
        <InputBox props={idProps} />
        <SubTitle>乘車備註</SubTitle>
        <InputBox props={remarkProps} />
      </>
      <ButtonBox refs={refs} />
    </FormWrapper>
  );
}
