import styled from "styled-components";
import { v } from "../../styles/Variables";
import { FaUser, FaUserPlus, FaUserEdit, FaUserTimes } from "react-icons/fa";
import { Link, Route, useLocation } from "wouter";
import PutTransferencia from "../../components/TransferenciasComponents/Put";
import DeleteTransferencia from "../../components/TransferenciasComponents/Delete";
import PostTransferencia from "../../components/TransferenciasComponents/Post";
import DeleteDeposito from "../../components/DepositoComponents/Delete";
import GetDepositos from "../../components/DepositoComponents/Get";
import PutDeposito from "../../components/DepositoComponents/Put";

export function Deposito() {
    const [location] = useLocation(); 

    return (
        <Container>
            <Title>Gestiona los depósitos</Title>

            <Navbar>
                <StyledLink href="/transacciones/deposito/lista" $active={location.endsWith("lista")}>
                    <FaUser />
                    <span>Lista</span>
                </StyledLink>
                <StyledLink href="/transacciones/deposito/crear" $active={location.endsWith("crear")}>
                    <FaUserPlus />
                    <span>Crear</span>
                </StyledLink>
                <StyledLink href="/transacciones/deposito/editar" $active={location.endsWith("editar")}>
                    <FaUserEdit />
                    <span>Editar</span>
                </StyledLink>
                <StyledLink href="/transacciones/deposito/eliminar" $active={location.endsWith("eliminar")}>
                    <FaUserTimes />
                    <span>Eliminar</span>
                </StyledLink>
            </Navbar>

            {/* Rutas para renderizar los componentes */}
            <div>
                <Route path="/transacciones/deposito/lista" component={GetDepositos} />
                <Route path="/transacciones/deposito/crear" component={PostTransferencia} />
                <Route path="/transacciones/deposito/editar" component={PutDeposito} />
                <Route path="/transacciones/deposito/eliminar" component={DeleteDeposito} />
            </div>
        </Container>
    );
}

// Estilos
const Container = styled.div`
    height: auto;
    padding: ${v.lgSpacing};
    background: ${(props) => props.theme.bgtotal};
    color: ${({ theme }) => theme.text};
    max-width: auto;
    @media (max-width: 768px) {
        padding: 0rem;
    }
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