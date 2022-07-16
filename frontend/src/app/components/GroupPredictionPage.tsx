import { Button, Input, Table } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components/macro";
import { ROUTER_CONFIG } from "../../router";
import { useCreateTask1Mutation } from "../api/api";

export interface Item {
  id: number;
  product_name: string;
  group: string;
  reglament: string;
  code: number;
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

export default function GroupPredictionPage() {
  const { push } = useHistory();
  const [createTask, { data: results, isSuccess }] = useCreateTask1Mutation();
  const formik = useFormik({
    initialValues: {
      code: 0,
      product_name: "",
      reglament: "",
      group: "",
      id: 0,
    },
    onSubmit: (values) => createTask(values),
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
        ROUTER_CONFIG.RESULTS_PAGE.getPath({ id: formik.values.id.toString() }),
        {
          item: formik.values,
          results: results,
        }
      );
    }
  }, [isSuccess, results]);

  return (
    <Container>
      <Title>
        Предсказание группы, товарной номенклатуры и технического регламента
        продукции
      </Title>
      <GrayText>Заполните строку данных, либо загрузите таблицу</GrayText>
      <form onSubmit={formik.handleSubmit} style={{ backgroundColor: "white" }}>
        <Table
          components={components}
          dataSource={[]}
          bordered
          columns={columns}
          pagination={false}
        />
        {/* я встретил баг с таблицей и вместо того, чтоб его фиксить - нарисовал ещё одну таблицу рядом. Наслаждайтесь.d */}
        <table style={{ width: "100%" }}>
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
      </form>

      <Button
        onClick={() => formik.handleSubmit()}
        type="primary"
        style={{ marginTop: 15 }}
      >
        Отправить
      </Button>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h1``;

const GrayText = styled.span`
  color: gray;
  font-size: 24px;
`;
