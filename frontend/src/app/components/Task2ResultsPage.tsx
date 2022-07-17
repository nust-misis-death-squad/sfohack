import { Table } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Task2Results } from "../api/api";
import { ROUTER_CONFIG } from "../../router";
import MapComponent from "./MapComponent";
import PlotComponent from "./PlotComponent";

interface Item {
  id: string;
  product_name: string;
}

const renderCell = (textOfCell: string, rowData: Item, index: number) => {
  return (
    <div>
      {textOfCell.split(" ").map((text, index) => (
        <div key={index}>{text}</div>
      ))}
    </div>
  );
};

const columns = [
  {
    key: "id",
    title: "Код",
    dataIndex: "id",
    width: "20%",
  },
  {
    key: "product_name",
    title: "Общее наименование продукта",
    dataIndex: "product_name",
    width: "20%",
  },
  {
    key: "recommendation_code",
    title: "ТН ВЭД ЕАЭС",
    dataIndex: "recommendation_code",
    width: "20%",
    render: renderCell,
  },
  {
    key: "recommendation_reglament",
    title: "Технические регламенты",
    dataIndex: "recommendation_reglament",
    width: "20%",
    render: renderCell,
  },
  {
    key: "recommendation_groups",
    title: "Группа продукции",
    dataIndex: "recommendation_groups",
    width: "20%",
    render: renderCell,
  },
].map((col) => ({
  ...col,
  onCell: (record: Item) => ({
    record,
    title: col.title,
  }),
}));

interface PathState {
  item: Item;
  results: Task2Results;
}

export default function Task2ResultsPage() {
  const { location, push } = useHistory();

  const onGoBack = () => push(ROUTER_CONFIG.TASK2_PAGE.getPath());

  const state = location.state as PathState;

  console.log(state.results);

  const tableData = [
    {
      ...state.item,
      recommendation_code: state.results.recommendation_code.join(" "),
      recommendation_reglament:
        state.results.recommendation_reglament.join(" "),
      recommendation_groups: state.results.recommendation_groups.join(" "),
    },
  ];

  return (
    <Container>
      <TitleHolder>
        <ArrowLeftOutlined
          onClick={onGoBack}
          style={{ fontSize: 20, margin: "auto 10px" }}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <PlotComponent chartData={state.results.table} />
        <MapComponent
          coordinates_license={state.results.coordinates_license}
          coordinates_producer={state.results.coordinates_producer}
        />
      </div>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h1``;

const TitleHolder = styled.div`
  display: flex;
`;
