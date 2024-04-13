import { isDefined } from '@/app/utils/utils';
import { RefObject, useState } from 'react';
import { useFormStore } from './store';
import { DynamicFormValidate, FormValidate } from './interface';

export const useForm = () => {
  const { setValidateValue, form } = useFormStore();
  const airlineIdRegex = new RegExp('^[A-Za-z\\d]+$');
  const nameRegex = new RegExp('^[a-zA-Z\\s]*[a-zA-Z]+[a-zA-Z\\s]*$');
  const phoneNumberRegex = new RegExp('^[\\d]+$');
  const idRegex = new RegExp('^[A-Z\\d]+$');

  //   const [formValidate, setFormValidate] = useState<FormValidateState>({
  //     airport: true,
  //     airlineId: true,
  //     name: true,
  //     phoneNumber: true,
  //     id: true,
  //     remark: true,
  //   });
  const isFormValidated = (result: DynamicFormValidate) => {
    const values: boolean[] = Object.values(result);
    const allValidated = !values.includes(false);
    return allValidated;
  };

  const testRegex = (inputRef: RefObject<HTMLDivElement>, regex: RegExp) => {
    const inputValue = inputRef?.current?.textContent;
    if (isDefined(inputValue)) return regex.test(inputValue);
    return false;
  };

  const validatedResult = (refs: {
    airlineIdRef: RefObject<HTMLDivElement>;
    nameRef: RefObject<HTMLDivElement>;
    phoneNumberRegex: RefObject<HTMLDivElement>;
    idRef: RefObject<HTMLDivElement>;
  }): FormValidate => {
    const checkAirlineId = testRegex(refs.airlineIdRef, airlineIdRegex);
    const checkName = testRegex(refs.nameRef, nameRegex);
    const checkPhoneNumber = testRegex(refs.phoneNumberRegex, phoneNumberRegex);
    const checkId = testRegex(refs.idRef, idRegex);
    const result: FormValidate = {
      remark: form.remark,
      airport: form.airport,
      airlineId: checkAirlineId,
      name: checkName,
      phoneNumber: checkPhoneNumber,
      id: checkId,
    };
    setValidateValue({
      airlineId: checkAirlineId,
      name: checkName,
      phoneNumber: checkPhoneNumber,
      id: checkId,
    });
    return result;
  };

  return { validatedResult, isFormValidated, setValidateValue, form };
};
