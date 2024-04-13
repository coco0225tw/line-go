import { create } from 'zustand';
import { FormState } from './interface';

export const useFormStore = create<FormState>((set, get) => ({
  form: {
    airport: true,
    airlineId: true,
    name: true,
    phoneNumber: true,
    id: true,
    remark: true,
  },

  setValidateValue: (payload) => {
    const newForm = {
      ...get().form,
      airlineId: payload.airlineId,
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      id: payload.id,
    };
    set({
      form: newForm,
    });
  },
}));
