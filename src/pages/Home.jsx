import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUserTie,
  FaExchangeAlt,
  FaCreditCard,
  FaUniversity,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { v } from "../styles/Variables";

import DashboardGrid from "../components/HomeComponents/DashboardGrid";
import StatsChart from "../components/HomeComponents/StatsChart";

import { getClientes } from "../services/clienteService";
import { getEmpleados } from "../services/empleadoService";
import { getTransferencias } from "../services/transferenciaService";
import { getTarjetasCredito } from "../services/tarjetaCreditoService";
import { getCuentasBancarias } from "../services/cuentaBancariaService";
import { getPrestamosHipotecarios } from "../services/prestamoHipotecarioService";
import { getPrestamosPersonales } from "../services/prestamoPersonalService";
import { getTarjetasDebito } from "../services/tarjetaDebitoService";
import { getDepositos } from "../services/depositoService";
import { getRetiros } from "../services/retiroService";
import LoansChart from "../components/HomeComponents/PrestamosChart";

const Container = styled.div`
  padding: ${v.lgSpacing};
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontxxl};
  color: ${({ theme }) => theme.textprimary};
  margin-bottom: 0.5rem;
  @media (max-width: 768px) {
    line-height:1.2;
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

/** Nuevo wrapper de dos columnas */
const DashboardWrapper = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/** Contenedor de las cards (columna izquierda) */
const CardsWrapper = styled.div`
  flex: 1;
`;

/** Contenedor del chart (columna derecha) */
const ChartWrapper = styled.div`
  flex: 1;
`;

const Home = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    clientes: 0,
    empleados: 0,
    transacciones: 0,
    tarjetas: 0,
    cuentas: 0,
    prestamos: 0,
  });

  // Carga de datos
  useEffect(() => {
    (async () => {
      const [
        clientes,
        empleados,
        cuentas,
        tarjC,
        tarjD,
        trans,
        deps,
        retiros,
        ph,
        pp,
      ] = await Promise.all([
        getClientes(),
        getEmpleados(),
        getCuentasBancarias(),
        getTarjetasCredito(),
        getTarjetasDebito(),
        getTransferencias(),
        getDepositos(),
        getRetiros(),
        getPrestamosHipotecarios(),
        getPrestamosPersonales(),
      ]);

      setCounts({
        clientes: clientes.length,
        empleados: empleados.length,
        cuentas: cuentas.length,
        tarjetas: tarjC.length + tarjD.length,
        transacciones: trans.length + deps.length + retiros.length,
        prestamos: ph.length + pp.length,
      });
    })();
  }, []);

  // Datos para DashboardGrid
  const cards = [
    {
      title: "Clientes",
      description: "Gestión completa de los clientes.",
      icon: <FaUsers />,
      count: counts.clientes,
      route: "/clientes",
    },
    {
      title: "Empleados",
      description: "Registro y administración de empleados.",
      icon: <FaUserTie />,
      count: counts.empleados,
      route: "/empleados",
    },
    {
      title: "Transacciones",
      description: "Retiros, depósitos y transferencias.",
      icon: <FaExchangeAlt />,
      count: counts.transacciones,
      route: "/transacciones",
    },
    {
      title: "Tarjetas",
      description: "Crédito y débito para clientes.",
      icon: <FaCreditCard />,
      count: counts.tarjetas,
      route: "/tarjetas",
    },
    {
      title: "Cuentas Bancarias",
      description: "Apertura y seguimiento de cuentas.",
      icon: <FaUniversity />,
      count: counts.cuentas,
      route: "/cuentas",
    },
    {
      title: "Préstamos",
      description: "Personales e hipotecarios.",
      icon: <FaMoneyCheckAlt />,
      count: counts.prestamos,
      route: "/prestamos",
    },
  ];

  return (
    <Container theme={theme}>
      <Hero>
        <Title theme={theme}>Sistema de Gestión Bancaria</Title>
        <Subtitle theme={theme}>
          Administra todas las operaciones del banco desde un solo lugar. 
          Clientes, empleados, transacciones, tarjetas, cuentas y préstamos, todo en una interfaz moderna.
        </Subtitle>
      </Hero>

      <DashboardWrapper>
        {/* Izquierda: Cards */}
        <CardsWrapper>
          <DashboardGrid cards={cards} navigate={navigate} />
        </CardsWrapper>

        {/* Derecha: Chart */}
        <ChartWrapper>
          <StatsChart />
          <LoansChart />
        </ChartWrapper>
      </DashboardWrapper>
    </Container>
  );
};

export default Home;

