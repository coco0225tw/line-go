import styled from 'styled-components';
export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  padding: 20px;
  color: #4b5c6b;
  .title {
    align-self: center;
    font-size: 24px;
  }
  .subTitle {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .form_item {
    font-weight: bold;
    margin-bottom: 4px;
  }
  .input {
    height: 56px;
    margin-bottom: 20px;
    line-height: 56px;
    &.error {
      outline-color: #d3455b;
    }
  }
  #remark {
    flex-grow: 1;
    margin-bottom: 20px;
  }
  .input,
  #remark {
    font-size: 24px;
    border-radius: 4px;
    outline: 2px solid #c2cfd9;
    padding-left: 12px;
  }
  .input:focus,
  #remark:focus {
    //outline-color: red; //todo
  }

  .button {
    height: 40px;
    background-color: #4b5c6b;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
  }
  #airport {
    background-color: #f8f9fa;
    color: #c2cfd9;
  }
`;
