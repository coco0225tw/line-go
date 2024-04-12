import { ButtonWrapper } from './style';
import { ButtonTheme } from '@/app/enum';
export function Button({ message, submitFun, theme }: { message: string; submitFun: () => void; theme: ButtonTheme }) {
  return (
    <ButtonWrapper theme={theme} onClick={submitFun}>
      {message}
    </ButtonWrapper>
  );
}
