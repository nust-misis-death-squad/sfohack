import { Button, Input, Table } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import styled from "styled-components/macro";
import { ROUTER_CONFIG } from "../../router";
import { useCreateTask1Mutation } from "../api/api";
import { createTask1Form } from "./schema";

export interface Item {
  id: string;
  product_name: string;
  group: string;
  reglament: string;
  code: string;
}

interface EditableCellProps {
  title: React.ReactNode;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const columns = [
  {
    title: "Идентификатор",
    dataIndex: "id",
    width: "20%",
  },
  {
    title: "Общее наименование продукта",
    dataIndex: "product_name",
    width: "20%",
  },
  {
    title: "Технические регламенты",
    dataIndex: "reglament",
    width: "20%",
  },
  {
    title: "Группа продукции",
    dataIndex: "group",
    width: "20%",
  },
  {
    title: "Коды",
    dataIndex: "code",
    width: "20%",
  },
].map((col) => ({
  ...col,
  onCell: (record: Item) => ({
    record,
    dataIndex: col.dataIndex,
    title: col.title,
  }),
}));

interface EditableRowProps {
  index: number;
}

export default function Task1Page() {
  const { push } = useHistory();

  const onGoBack = () => push(ROUTER_CONFIG.MAIN_PAGE.getPath());

  const [createTask1, { data: results, isSuccess }] = useCreateTask1Mutation();
  const formik = useFormik({
    initialValues: {
      code: "",
      product_name: "",
      reglament: "",
      group: "",
      id: "",
    },
    validationSchema: createTask1Form,
    onSubmit: (values) => createTask1(values),
    isInitialValid: false,
  });

  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    return <tr key={index} {...props} />;
  };

  const EditableCell: React.FC<EditableCellProps> = ({ dataIndex, record }) => {
    return (
      <td key={dataIndex} style={{ display: "none" }}>
        <Input
          name={dataIndex}
          id={dataIndex}
          onChange={formik.handleChange}
          value={formik.values[dataIndex]}
        />
      </td>
    );
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  useEffect(() => {
    if (isSuccess) {
      push(
        ROUTER_CONFIG.TASK1_RESULTS_PAGE.getPath({
          id: formik.values.id.toString(),
        }),
        {
          item: formik.values,
          results: results,
        }
      );
    }
  }, [isSuccess, results]);

  return (
    <Container>
      <TitleHolder>
        <ArrowLeftOutlined
          onClick={onGoBack}
          style={{ fontSize: 20, marginTop: 25, marginRight: 25 }}
        />
        <Title>
          Предсказание группы, товарной номенклатуры и технического регламента
          продукции
        </Title>
      </TitleHolder>
      <GrayText>Заполните строку данных, либо загрузите таблицу</GrayText>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ backgroundColor: "white" }}>
          <Table
            components={components}
            dataSource={[]}
            bordered
            columns={columns}
            pagination={false}
          />
          {/* я встретил баг с таблицей и вместо того, чтоб его фиксить - нарисовал ещё одну таблицу рядом. Наслаждайтесь.d */}
          <table style={{ width: "100%", minWidth: 546 }}>
            <tbody>
              <tr>
                {columns.map((col) => (
                  <td key={col.dataIndex}>
                    <Input
                      name={col.dataIndex}
                      id={col.dataIndex}
                      onChange={formik.handleChange}
                      value={formik.values[col.dataIndex as keyof Item]}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <Button
          onClick={() => formik.handleSubmit()}
          disabled={!formik.isValid}
          type="primary"
          style={{ marginTop: 15 }}
        >
          Отправить
        </Button>
      </form>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h1``;

const GrayText = styled.span`
  color: gray;
  font-size: 24px;
`;

const TitleHolder = styled.div`
  display: flex;
`;
