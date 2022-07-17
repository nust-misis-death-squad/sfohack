import React, { ReactNode } from "react";
import styled from "styled-components/macro";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <ContainerLayout>{children}</ContainerLayout>;
      <Footer />
    </>
  );
}

const Footer = () => {
  return (
    <Box>
      <span style={{ color: "green", textAlign: "center", marginTop: "-50px" }}>
        Copyright ©2022 nust misis death squad 2.0
      </span>
      <Container>
        <Row></Row>
      </Container>
    </Box>
  );
};

const ContainerLayout = styled.div`
  padding: 30px;
`;

export const Box = styled.div`
  padding: 80px 60px;
  background: #ffff;
  position: absolute;
  bottom: 0;
  width: 100%;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  /* background: red; */
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: green;
    transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;
