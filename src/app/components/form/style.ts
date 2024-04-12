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
  .title {
    align-self: center;
    font-size: 24px;
  }
  #remark {
    flex-grow: 1;
    margin-bottom: 20px;
    min-height: 0;
    white-space: wrap;
    -webkit-appearance: textarea;
  }
  .input,
  #remark {
    font-size: 24px;
    border-radius: 4px;
    outline: 2px solid #c2cfd9;
    padding-left: 12px;
  }
  .input:focus,
  #airport {
    background-color: #f8f9fa;
    color: #c2cfd9;
  }
  /* #remark {
    overflow-y: scroll;
    overflow-x: hidden;
    display: inline-block;
  } */
`;

export const SubFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Title = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;
export const SubTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;
export const Input = styled.div`
  height: 56px;
  margin-bottom: 20px;
  line-height: 56px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  flex-basis: 56px;
  flex-shrink: 0;
  &.error {
    outline-color: #d3455b;
  }
`;
