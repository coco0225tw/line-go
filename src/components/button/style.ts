import styled, { css } from 'styled-components';
import { ButtonTheme } from '../../utils/enum';
interface ButtonWrapperProps {
  theme: ButtonTheme;
}
export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  height: 40px;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  width: 100%;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  & + & {
    margin-top: 10px;
  }
  ${(props) =>
    props.theme === ButtonTheme.Dark &&
    css`
      background-color: #4b5c6b;
      color: #fff;
    `}

  ${(props) =>
    props.theme === ButtonTheme.Light &&
    css`
      background-color: #fff;
      color: #4b5c6b;
      border: solid 1px #c2cfd9;
    `}
`;
