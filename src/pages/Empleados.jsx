import styled from "styled-components";
import { v } from "../styles/Variables";
import { FaUserTie } from "react-icons/fa";
import { Link, Route, useLocation } from "wouter";
import PostClient from "../components/PostClient";
import GetEmpleados from "../components/EmpleadoComponents/GetEmpleado";
import PutEmpleados from "../components/EmpleadoComponents/PutEmpleado";
import DeleteEmpleado from "../components/EmpleadoComponents/DeleteEmpleado";
import { MdAddReaction, MdDelete, MdEdit } from "react-icons/md";
import PostEmpleado from "../components/EmpleadoComponents/PostEmpleado";

// este es el Navbar que renderiza cada componente DataGrid
export function Empleados() {
    const [location] = useLocation(); 

    return (
        <Container>
            <Title>Gestiona los Empleados</Title>

            <Navbar>
                <StyledLink href="/getclientes" $active={location === "/getclientes"}>
                    <FaUserTie />
                    <span>Lista</span>
                </StyledLink>
                <StyledLink href="/postcliente" $active={location === "/postcliente"}>
                    <MdAddReaction />
                    <span>Crear</span>
                </StyledLink>
                <StyledLink href="/putcliente" $active={location === "/putcliente"}>
                    <MdEdit />
                    <span>Editar</span>
                </StyledLink>
                <StyledLink href="/deletecliente" $active={location === "/deletecliente"}>
                    <MdDelete />
                    <span>Eliminar</span>
                </StyledLink>
            </Navbar>

            {/* Rutas para renderizar los componentes */}
            <div>
                <Route path="/getclientes" component={GetEmpleados} />
                <Route path="/postcliente" component={PostEmpleado} />
                <Route path="/putcliente" component={PutEmpleados} />
                <Route path="/deletecliente" component={DeleteEmpleado} />
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
    overflow-y:hidden;
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

