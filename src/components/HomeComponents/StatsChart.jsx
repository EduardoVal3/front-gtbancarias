// src/components/HomeComponents/StatsChart.jsx

import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import PieChart, {
  Series,
  Title,
  Legend,
  Tooltip,
  Export,
} from "devextreme-react/pie-chart";

import { getDepositos } from "../../services/depositoService";
import { getRetiros } from "../../services/retiroService";
import { getTransferencias } from "../../services/transferenciaService";

const ChartWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export default function StatsChart() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [depositos, retiros, transferencias] = await Promise.all([
          getDepositos(),
          getRetiros(),
          getTransferencias(),
        ]);

        setData([
          { type: "Depósitos", count: depositos.length },
          { type: "Retiros", count: retiros.length },
          { type: "Transferencias", count: transferencias.length },
        ]);
      } catch (e) {
        console.error("Error cargando StatsChart:", e);
      }
    };
    loadData();
  }, []);

  if (!data.length || data.every(item => item.count === 0)) {
    return (
      <ChartWrapper theme={theme}>
        <p>No hay transacciones para mostrar.</p>
      </ChartWrapper>
    );
  }

  return (
    <ChartWrapper theme={theme}>
      <PieChart
        id="pie"
        dataSource={data}
        palette="Violet"
      >
        <Series
          argumentField="type"
          valueField="count"
          label={{
            visible: true,
            connector: { visible: true },
            format: "fixedPoint",
            customizeText: ({ argument, percentText }) =>
              `${argument}: ${percentText}`,
          }}
        />
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
          itemTextPosition="right"
        />
        <Tooltip enabled={true} format="fixedPoint" />
        <Export enabled={true} />
        <Title text="Distribución de Transacciones por Tipo" />
      </PieChart>
    </ChartWrapper>
  );
}
