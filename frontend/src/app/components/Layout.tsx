import React, { ReactNode } from "react";
import styled from "styled-components/macro";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  padding: 30px;
`;
