import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Task1Results } from "../api/api";
import { ROUTER_CONFIG } from "../../router";

interface Item {
  id: string;
  product_name: string;
  group: string;
  reglament: string;
  code: string;
}

const renderCell = (textOfCell: string, rowData: Item, index: number) => {
  if (index === 1) {
    if (textOfCell) {
      return (
        <div style={{ color: "red" }}>
          {textOfCell.split(" ").map((text) => (
            <div>{text}</div>
          ))}
        </div>
      );
    } else {
      return <div style={{ color: "green" }}>Ok</div>;
    }
  }
  return textOfCell;
};

const columns: ColumnsType<Item> = [
  {
    title: "Идентификатор",
    dataIndex: "id",
    width: "20%",
    render: (textOfCell: string, rowData: Item, index: number) => {
      if (index === 1) {
        return <></>;
      }
      return textOfCell;
    },
  },
  {
    title: "Общее наименование продукта",
    dataIndex: "product_name",
    width: "20%",
    render: (textOfCell: string, rowData: Item, index: number) => {
      if (index === 1) {
        return <></>;
      }
      return textOfCell;
    },
  },
  {
    title: "Технические регламенты",
    dataIndex: "reglament",
    width: "20%",
    render: renderCell,
  },
  {
    title: "Группа продукции",
    dataIndex: "group",
    width: "20%",
    render: renderCell,
  },
  {
    title: "Коды",
    dataIndex: "code",
    width: "20%",
    render: renderCell,
  },
].map((col) => ({
  ...col,
  onCell: (record: Item) => ({
    record,
    dataIndex: col.dataIndex,
    title: col.title,
  }),
}));

interface PathState {
  item: Item;
  results: Task1Results;
}

export default function GroupPredictionResultsPage({}) {
  const { location, push } = useHistory();

  const onGoBack = () => push(ROUTER_CONFIG.MAIN_PAGE.getPath());

  const state = location.state as PathState;

  const getResultsRow = (results: Task1Results): Item => {
    if (results.error_cell_number !== null) {
      if (results.error_cell_number === 2) {
        return {
          id: "",
          product_name: "",
          group: results.recommended_error_cell_content.join(" "),
          reglament: "",
          code: "",
        };
      }
      if (results.error_cell_number === 3) {
        return {
          id: "",
          product_name: "",
          group: "",
          reglament: results.recommended_error_cell_content.join(" "),
          code: "",
        };
      }
      if (results.error_cell_number === 4) {
        return {
          id: "",
          product_name: "",
          group: "",
          reglament: "",
          code: results.recommended_error_cell_content.join(" "),
        };
      }
    }
    return {
      id: "",
      product_name: "",
      group: "",
      reglament: "",
      code: "",
    };
  };

  const tableData = [state.item, getResultsRow(state.results)];

  return (
    <Container>
      <TitleHolder>
        <ArrowLeftOutlined
          onClick={onGoBack}
          style={{ fontSize: 20, marginTop: 25, marginRight:25 }}
        />
        <Title>
          Предсказание группы, товарной номенклатуры и технического регламента
          продукции
        </Title>
      </TitleHolder>
      <Table
        //   components={components}
        dataSource={tableData}
        bordered
        columns={columns}
        pagination={false}
      />
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h1``;

const TitleHolder = styled.div`
  display: flex;
`;
