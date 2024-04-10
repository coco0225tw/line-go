import { ButtonWrapper } from './style';

export enum ButtonTheme1 {
  Dark = 'DARK',
  Light = 'LIGHt',
} //todo
export function Button({ message, submitFun, theme }: { message: string; submitFun: () => void; theme: ButtonTheme1 }) {
  return (
    <ButtonWrapper theme={theme} onClick={submitFun}>
      {message}
    </ButtonWrapper>
  );
}
