import styled from 'styled-components';
export const PopUpWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  position: relative;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
`;

export const SuccessPopUpWrapper = styled(ContentWrapper)`
  padding: 40px 40px 60px;
  .message {
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
  }
`;
export const ErrorPopUpWrapper = styled(ContentWrapper)`
  .button_wrapper {
    width: 100%;
    position: relative;
  }
  .title {
    font-size: 30px;
    align-self: flex-start;
    margin-bottom: 20px;
  }
  .message {
    align-self: flex-start;
    margin-bottom: 20px;
  }
`;
