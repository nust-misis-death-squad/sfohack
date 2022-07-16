import React, { ReactNode } from "react";
import styled from "styled-components/macro";

interface Props {
  points: any;
}

export default function Plot({ points }: Props) {
  return <Container>Plot</Container>;
}

const Container = styled.div`
  background-color: grey;
  width: 400px;
  height: 500px;
`;
