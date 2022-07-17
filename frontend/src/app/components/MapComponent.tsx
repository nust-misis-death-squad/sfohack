import React, { ReactNode, useState } from "react";
import styled from "styled-components/macro";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Button from "antd/lib/button";

interface Props {
  coordinates_license: number[][];
  coordinates_producer: number[][];
}

const center = [55.76, 37.64];

export default function MapComponent({
  coordinates_license,
  coordinates_producer,
}: Props) {
  const [showLicense, setShowLicense] = useState<boolean>(true);
  const [showProducer, setShowProducer] = useState<boolean>(true);

  return (
    <Container>
      <YMaps query={{ load: "package.full" }}>
        <div style={{ display: "flex", marginBottom: 15, gap: 20 }}>
          <Button
            type={showLicense ? "primary" : "default"}
            onClick={() => setShowLicense(!showLicense)}
            style={{ borderRadius: 15 }}
          >
            Заявители
          </Button>
          <Button
            type={showProducer ? "primary" : "default"}
            onClick={() => setShowProducer(!showProducer)}
            style={{ borderRadius: 15 }}
          >
            Изготовители
          </Button>
        </div>
        <Map
          state={{
            center,
            zoom: 4,
            controls: [],
          }}
          width="100%"
          height="100%"
        >
          {showLicense &&
            coordinates_license.map((coords, index) => (
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
          {showProducer &&
            coordinates_producer.map((coords, index) => (
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
