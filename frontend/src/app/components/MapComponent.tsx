import React, { ReactNode } from "react";
import styled from "styled-components/macro";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

interface Props {
  coordinates_license: number[][];
  coordinates_producer: number[][];
}

const center = [55.76, 37.64];

export default function MapComponent({
  coordinates_license,
  coordinates_producer,
}: Props) {
  return (
    <Container>
      <YMaps query={{ load: "package.full" }}>
        <Map
          state={{
            center,
            zoom: 4,
            controls: [],
          }}
          width="100%"
          height="100%"
        >
          {coordinates_license.map((coords, index) => (
            <Placemark
              key={index}
              geometry={coords}
              options={{
                preset: "islands#dotIcon",
                iconImageSize: [50, 50],
                iconColor: "#ff0000",
              }}
            />
          ))}
          {coordinates_producer.map((coords, index) => (
            <Placemark
              key={index}
              geometry={coords}
              options={{
                preset: "islands#dotIcon",
                iconImageSize: [50, 50],
                iconColor: "#0000ff",
              }}
            />
          ))}
        </Map>
      </YMaps>
    </Container>
  );
}

const Container = styled.div`
  width: 400px;
  height: 500px;
`;
