import { useReactiveVar } from "@apollo/client";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { isLoggedInVar } from "../apollo/vars";

interface ContainerProps {
  isLoggedIn: boolean;
  hasHeader: boolean;
}

const Container = styled.main<ContainerProps>`
  min-height: 100vh;
  color: ${({ theme }) => theme.fontColor};
  ${({ isLoggedIn }) =>
    isLoggedIn &&
    css`
      max-width: 500px;
      background-color: #8a624a;
      margin: 0 auto;
    `}
  padding-top: ${({ hasHeader }) => (hasHeader ? 56 : 0)}px;
`;

const Header = styled.header`
  position: relative;
  max-width: 500px;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  background-color: #8a624a;
  -webkit-box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const HeaderTitle = styled.h1`
  font-size: 32px;
`;

const GoBack = styled.button`
  all: unset;
  font-size: 24px;
  cursor: pointer;
  width: 56px;
  height: 56px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  children: ReactNode;
  headerTitle?: string;
  canGoBack?: boolean;
}

function Layout({ children, headerTitle, canGoBack }: Props) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const navigate = useNavigate();

  const hasHeader = Boolean(headerTitle) || Boolean(canGoBack);

  return (
    <Container isLoggedIn={isLoggedIn} hasHeader={hasHeader}>
      {hasHeader && (
        <Header>
          {canGoBack && <GoBack onClick={() => navigate(-1)}>👈</GoBack>}
          <HeaderTitle>{headerTitle}</HeaderTitle>
        </Header>
      )}
      {children}
    </Container>
  );
}

export default Layout;
