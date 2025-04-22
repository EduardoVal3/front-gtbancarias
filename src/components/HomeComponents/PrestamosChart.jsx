// src/components/HomeComponents/LoansChart.jsx
import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import PieChart, {
  Series,
  Title,
  Legend,
  Tooltip,
  Export,
} from "devextreme-react/pie-chart";

import { getPrestamosHipotecarios } from "../../services/prestamoHipotecarioService";
import { getPrestamosPersonales }   from "../../services/prestamoPersonalService";

const ChartWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

export default function LoansChart() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [hipotecarios, personales] = await Promise.all([
          getPrestamosHipotecarios(),
          getPrestamosPersonales(),
        ]);
        setData([
          { type: "Hipotecarios", count: hipotecarios.length },
          { type: "Personales",   count: personales.length },
        ]);
      } catch (e) {
        console.error("Error cargando LoansChart:", e);
      }
    };
    loadData();
  }, []);

  if (!data.length || data.every(item => item.count === 0)) {
    return (
      <ChartWrapper theme={theme}>
        <p>No hay préstamos para mostrar.</p>
      </ChartWrapper>
    );
  }

  return (
    <ChartWrapper theme={theme}>
      <PieChart
        id="loans-pie"
        dataSource={data}
        palette="Soft"
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
        <Title text="Distribución de Préstamos por Tipo" />
      </PieChart>
    </ChartWrapper>
  );
}
