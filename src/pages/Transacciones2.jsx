import styled from "styled-components";
import { v } from "../styles/Variables";
import { FaMoneyBill } from "react-icons/fa";
import { Link, Route, useLocation } from "wouter";
import { Deposito } from "./subpages/Deposito";
import { Transferencia } from "./subpages/Transferencias";
import { Retiro } from "./subpages/Retiro";
import { FaMoneyBillTransfer, FaMoneyBillTrendUp } from "react-icons/fa6";


// este es el Navbar que renderiza cada componente DataGrid
export function Transacciones2() {
    const [location] = useLocation(); 

    return (
        <Container>
            <Title>Elige el tipo de Transacción</Title>

            <Navbar>
                <StyledLink href="/transacciones/transferencia/" $active={location.endsWith("transferencia/")}>
                    <FaMoneyBillTransfer />
                    <span>Transferencia</span>
                </StyledLink>
                <StyledLink href="/transacciones/deposito/" $active={location.endsWith("deposito/")}>
                    <FaMoneyBill />
                    <span>Depósito</span>
                </StyledLink>
                <StyledLink href="/transacciones/retiro/" $active={location.endsWith("retiro/")}>
                    <FaMoneyBillTrendUp />
                    <span>Retiro</span>
                </StyledLink>

            </Navbar>

            {/* Rutas para renderizar los componentes */}
            <div>
                <Route path="/transacciones/deposito/*" component={Deposito} />
                <Route path="/transacciones/retiro/*" component={Retiro} />
                <Route path="/transacciones/transferencia/*" component={Transferencia} />
            </div>
        </Container>
    );
}

// Estilos
const Container = styled.div`
    height: auto;
    background: ${(props) => props.theme.bgtotal};
    padding: ${v.lgSpacing};
    color: ${({ theme }) => theme.text};
    max-width: auto;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.textprimary};
  margin-bottom: 1.5rem;
  font-size: ${({ theme }) => theme.fontxl};
  text-align: center;
  line-height: 1.2; /* Mejora legibilidad en móviles */
`;

const Navbar = styled.nav`
    display: flex;
    justify-content: center;
    margin-top: auto;
    flex-wrap: wrap;
    gap: ${v.mdSpacing};
    margin-bottom: ${v.lgSpacing};
    background: ${({ theme }) => theme.bg2};
    padding: ${v.mdSpacing};
    border-radius: ${v.borderRadius};
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: ${v.smSpacing};
    padding: ${v.smSpacing} ${v.mdSpacing};
    color: ${({ theme, $active }) => $active ? "#fff" : theme.text};
    background: ${({ theme, $active }) => $active ? theme.bg4 : theme.bg3};
    border-radius: ${v.borderRadius};
    text-decoration: none;
    font-weight: 500;
    transition: background 0.3s ease, transform 0.2s;

    &:hover {
        background: ${({ theme }) => theme.bg4};
        transform: translateY(-2px);
        color: #fff;

        svg {
            color: #fff;
        }
    }

    svg {
        font-size: 1.1rem;
        transition: color 0.3s ease;
        color: ${({ $active }) => $active ? "#fff" : "inherit"};
    }

    span {
        font-size: ${({ theme }) => theme.fontsm};
    }
`;