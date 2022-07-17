import { Card } from "antd";
import React, { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { ROUTER_CONFIG } from "../../router";

export default function SelectTaskPage() {
  const { push } = useHistory();

  const goToTask1 = () => push(ROUTER_CONFIG.TASK1_PAGE.getPath());
  const goToTask2 = () => push(ROUTER_CONFIG.TASK2_PAGE.getPath());

  return (
    <Container>
      <Card
        size="default"
        title="Задача 1"
        style={{ width: "50%", cursor: "pointer" }}
        onClick={goToTask1}
      >
        <p>
          Предсказание группы, товарной номенклатуры и технического регламента
          продукции
        </p>
      </Card>
      <Card
        size="default"
        title="Задача2"
        style={{ width: "50%", cursor: "pointer" }}
        onClick={goToTask2}
      >
        <p>Оценка правильности заполнения данных продукции</p>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-between;
`;
