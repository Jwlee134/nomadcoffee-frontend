import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const SButton = styled.button`
  all: unset;
  height: 40px;
  background-color: #6f4827;
  width: 100%;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
}

function Button({ text, loading, ...rest }: Props) {
  return <SButton {...rest}>{loading ? "Loading" : text}</SButton>;
}

export default Button;
