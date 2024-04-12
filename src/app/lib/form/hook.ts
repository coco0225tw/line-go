import { isDefined } from '@/app/utils/utils';
import { RefObject, useState } from 'react';
import { FormValidateState } from './interface';

export const useForm = () => {
  const airlineIdRegex = new RegExp('^[A-Za-z\\d]+$');
  const nameRegex = new RegExp('^[a-zA-Z\\s]*[a-zA-Z]+[a-zA-Z\\s]*$');
  const phoneNumberRegex = new RegExp('^[\\d]+$');
  const idRegex = new RegExp('^[A-Z\\d]+$');

  const [formValidate, setFormValidate] = useState<FormValidateState>({
    airlineId: true,
    name: true,
    phoneNumber: true,
    id: true,
  });
  const isFormValidated = () => {
    const values: boolean[] = Object.values(formValidate);
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
  }) => {
    const checkAirlineId = testRegex(refs.airlineIdRef, airlineIdRegex);
    const checkName = testRegex(refs.nameRef, nameRegex);
    const checkPhoneNumber = testRegex(refs.phoneNumberRegex, phoneNumberRegex);
    const checkId = testRegex(refs.idRef, idRegex);

    setFormValidate({
      airlineId: checkAirlineId,
      name: checkName,
      phoneNumber: checkPhoneNumber,
      id: checkId,
    });
  };

  return { setFormValidate, validatedResult, isFormValidated, formValidate };
};
