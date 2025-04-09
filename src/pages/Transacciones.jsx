import styled from "styled-components";
import { v } from "../styles/Variables";
import GetClientes from "../components/GetClientes";
import { FaUser, FaUserPlus, FaUserEdit, FaUserTimes } from "react-icons/fa";
import { Link, Route } from "wouter";
import DeleteClient from "../components/DeleteClient";
import PostClient from "../components/PostClient";
import PutClient from "../components/PutClient";

export function Transacciones() {
    return (
        <Container>
            <Title>Gestiona los clientes</Title>

            <Navbar>
                <StyledLink href="/getclientes">
                    <FaUser />
                    <span>Lista</span>
                </StyledLink>
                <StyledLink href="/postcliente">
                    <FaUserPlus />
                    <span>Crear</span>
                </StyledLink>
                <StyledLink href="/putcliente">
                    <FaUserEdit />
                    <span>Actualizar</span>
                </StyledLink>
                <StyledLink href="/deletecliente">
                    <FaUserTimes />
                    <span>Eliminar</span>
                </StyledLink>
            </Navbar>

            {/* Rutas para renderizar los componentes */}
            <div>
                <Route path="/getclientes" component={GetClientes} />
                <Route path="/postcliente" component={PostClient} />
                <Route path="/putcliente" component={PutClient} />
                <Route path="/deletecliente" component={DeleteClient} />
            </div>
        </Container>
    );
}

// Estilos
const Container = styled.div`
    height: 100vh;
    padding: ${v.lgSpacing};
    color: ${({ theme }) => theme.text};
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontxl};
    margin-bottom: ${v.lgSpacing};
`;

const Navbar = styled.nav`
    display: flex;
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
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.bg3};
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
    }

    span {
        font-size: ${({ theme }) => theme.fontsm};
    }
`;
