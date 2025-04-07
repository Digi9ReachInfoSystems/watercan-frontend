// CreateWaterCanForm.styles.js
import styled from "styled-components";

export const FormContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;

  form {
    display: flex;
    flex-direction: column;
  }

  .ant-form-item {
    margin-bottom: 15px;
  }

  .ant-btn {
    width: 150px;
  }

  .ant-modal .ant-modal-title{
    text-align: center;
  }

  .ant-form-item .ant-form-item-control-input-content {
    display: flex;
    justify-content: flex-end;
    align-items: end;
    margin-top: 5px;
  }

  .ant-form-item .ant-form-item-control-input{
      min-height: 0px;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;
