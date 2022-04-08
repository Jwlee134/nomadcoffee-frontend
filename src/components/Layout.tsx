import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
`;

function Layout({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

export default Layout;
