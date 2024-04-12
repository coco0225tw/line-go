import { ButtonWrapper } from './style';
import { ButtonTheme } from '@/app/utils/enum';
export function Button({ message, action, theme }: { message: string; action: () => void; theme: ButtonTheme }) {
  return (
    <ButtonWrapper theme={theme} onClick={action}>
      {message}
    </ButtonWrapper>
  );
}
