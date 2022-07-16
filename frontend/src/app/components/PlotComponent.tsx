import React, { ReactNode } from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components/macro";
import { ChartData } from "../api/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface Props {
  chartData: ChartData[];
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Резюме",
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Plot({ chartData }: Props) {
  console.log(chartData);
  const labels = chartData.map((data) => data.name);

  const data = {
    labels,
    datasets: [
      {
        data: chartData.map((data) => data.number),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <Container>
      <Bar options={options} data={data} />
    </Container>
  );
}

const Container = styled.div`
  width: 540px;
  height: 500px;
`;
