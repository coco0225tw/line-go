export interface FormValidate extends DynamicFormValidate {
  remark: boolean;
  airport: boolean;
}
export interface DynamicFormValidate {
  airlineId: boolean;
  name: boolean;
  phoneNumber: boolean;
  id: boolean;
}

export interface FormState {
  form: FormValidate;
  setValidateValue: (payload: DynamicFormValidate) => void;
}
