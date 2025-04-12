import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaUserTie, FaExchangeAlt, FaCreditCard, FaUniversity, FaMoneyCheckAlt } from "react-icons/fa";
import { v } from "../styles/Variables";
import { motion } from "framer-motion";

import { getClientes } from "../services/clienteService";
import { getEmpleados } from "../services/empleadoService";
import { getTransferencias } from "../services/transferenciaService";
import { getTarjetasCredito } from "../services/tarjetaCreditoService";
import { getCuentasBancarias } from "../services/cuentaBancariaService";

const Container = styled.div`
  height:auto;
  background-color: ${(props)=>props.theme.bgtotal};
  color: ${(props)=>props.theme.text};

  padding: ${v.lgSpacing};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  max-width: auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontxxl};
  color: ${({ theme }) => theme.textprimary};
  margin-bottom: 0rem;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.50rem;
  line-height: 1.6;
`;

const CardGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  width: 100%;
  max-width: auto;
`;

const NavCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.bg3};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-6px);
    background-color: ${({ theme }) => theme.bg4};
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.3rem;
`;

const CardDesc = styled.p`
  font-size: ${({ theme }) => theme.fontsm};
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Counter = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const Home = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const [dataCounts, setDataCounts] = useState({
    clientes: 0,
    empleados: 0,
    transacciones: 0,
    tarjetas: 0,
    cuentas: 0,
    prestamos: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [clientes, empleados, transacciones, tarjetas, cuentas, prestamos] = await Promise.all([
        getClientes(),
        getEmpleados(),
        getTransferencias(),
        getTarjetasCredito(),
        getCuentasBancarias(),
        // getPrestamos(),
      ]);

      setDataCounts({
        clientes: clientes.length,
        empleados: empleados.length,
        transacciones: transacciones.length,
        tarjetas: tarjetas.length,
        cuentas: cuentas.length,
        //prestamos: prestamos.length,
      });
    };

    fetchData();
  }, []);

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  const transition = { duration: 0.6, type: "spring", bounce: 0.3 };

  return (
    <Container theme={theme}>
      <Hero>
        <Title theme={theme}>Sistema de Gestión Bancaria</Title>
        <Subtitle theme={theme}>
          Administra todas las operaciones del banco desde un solo lugar. Clientes, empleados, transacciones, tarjetas, cuentas y préstamos, todo en una interfaz moderna.
        </Subtitle>
      </Hero>

      <CardGrid>
        <NavCard theme={theme} onClick={() => navigate("/clientes")} variants={cardVariants} initial="initial" animate="animate" transition={transition}>
          <IconWrapper theme={theme}><FaUsers /></IconWrapper>
          <CardTitle theme={theme}>Clientes</CardTitle>
          <CardDesc theme={theme}>Gestión completa de los clientes.</CardDesc>
          <Counter theme={theme}>{dataCounts.clientes}</Counter>
        </NavCard>

        <NavCard theme={theme} onClick={() => navigate("/empleados")} variants={cardVariants} initial="initial" animate="animate" transition={transition}>
          <IconWrapper theme={theme}><FaUserTie /></IconWrapper>
          <CardTitle theme={theme}>Empleados</CardTitle>
          <CardDesc theme={theme}>Registro y administración de empleados.</CardDesc>
          <Counter theme={theme}>{dataCounts.empleados}</Counter>
        </NavCard>

        <NavCard theme={theme} onClick={() => navigate("/transacciones")} variants={cardVariants} initial="initial" animate="animate" transition={transition}>
          <IconWrapper theme={theme}><FaExchangeAlt /></IconWrapper>
          <CardTitle theme={theme}>Transacciones</CardTitle>
          <CardDesc theme={theme}>Retiros, depósitos y transferencias.</CardDesc>
          <Counter theme={theme}>{dataCounts.transacciones}</Counter>
        </NavCard>

        <NavCard theme={theme} onClick={() => navigate("/tarjetas")} variants={cardVariants} initial="initial" animate="animate" transition={transition}>
          <IconWrapper theme={theme}><FaCreditCard /></IconWrapper>
          <CardTitle theme={theme}>Tarjetas</CardTitle>
          <CardDesc theme={theme}>Crédito y débito para clientes.</CardDesc>
          <Counter theme={theme}>{dataCounts.tarjetas}</Counter>
        </NavCard>

        <NavCard theme={theme} onClick={() => navigate("/cuentas")} variants={cardVariants} initial="initial" animate="animate" transition={transition}>
          <IconWrapper theme={theme}><FaUniversity /></IconWrapper>
          <CardTitle theme={theme}>Cuentas Bancarias</CardTitle>
          <CardDesc theme={theme}>Apertura y seguimiento de cuentas.</CardDesc>
          <Counter theme={theme}>{dataCounts.cuentas}</Counter>
        </NavCard>

        <NavCard theme={theme} onClick={() => navigate("/prestamos")} variants={cardVariants} initial="initial" animate="animate" transition={transition}>
          <IconWrapper theme={theme}><FaMoneyCheckAlt /></IconWrapper>
          <CardTitle theme={theme}>Préstamos</CardTitle>
          <CardDesc theme={theme}>Personales e hipotecarios.</CardDesc>
          
        </NavCard>
      </CardGrid>
    </Container>
  );
};

export default Home;

