import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 8px;
  }
  input {
    margin: 0;
    border: 0;
    background-color: white;
    height: 40px;
    padding: 0 10px;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
    margin-bottom: 20px;
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  last?: boolean;
  register: UseFormRegisterReturn;
}

function Input({ label, id, last = false, register, ...rest }: Props) {
  return (
    <Container>
      <label htmlFor={id}>{label}</label>
      <input {...register} id={id} type="text" {...rest} />
    </Container>
  );
}

export default Input;
