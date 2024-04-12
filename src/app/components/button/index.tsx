import { ButtonWrapper } from './style';
import { ButtonTheme } from '@/app/utils/enum';
export function Button({ message, submitFun, theme }: { message: string; submitFun: () => void; theme: ButtonTheme }) {
  return (
    <ButtonWrapper theme={theme} onClick={submitFun}>
      {message}
    </ButtonWrapper>
  );
}
