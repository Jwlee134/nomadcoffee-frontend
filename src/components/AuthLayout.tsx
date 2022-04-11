import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 400px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #9c6f44;
  padding: 30px 20px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
`;

interface Props {
  children: ReactNode;
}

function AuthLayout({ children }: Props) {
  return <Container>{children}</Container>;
}

export default AuthLayout;
