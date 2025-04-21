import styled from "styled-components";
import { v } from "../styles/Variables";
import { FaUniversity } from "react-icons/fa";
import { Link, Route, useLocation } from "wouter";
import GetCuentas from "../components/CuentasComponents/Get";
import PutCuentas from "../components/CuentasComponents/Put";
import DeleteCuenta from "../components/CuentasComponents/Delete";
import PostCuenta from "../components/CuentasComponents/Post";
import { MdDelete, MdEdit, MdLibraryAdd } from "react-icons/md";

export function CuentasBancarias() {
    const [location] = useLocation(); 

    return (
        <Container>
            <Title>Gestiona las Cuentas Bancarias</Title>

            <Navbar>
                <StyledLink href="/cuentas/lista" $active={location.endsWith("lista")}>
                    <FaUniversity />
                    <span>Lista</span>
                </StyledLink>
                <StyledLink href="/cuentas/crear" $active={location.endsWith("crear")}>
                    <MdLibraryAdd />
                    <span>Crear</span>
                </StyledLink>
                <StyledLink href="/cuentas/editar" $active={location.endsWith("editar")}>
                    <MdEdit />
                    <span>Editar</span>
                </StyledLink>
                <StyledLink href="/cuentas/eliminar" $active={location.endsWith("eliminar")}>
                    <MdDelete />
                    <span>Eliminar</span>
                </StyledLink>
            </Navbar>

            {/* Rutas para renderizar los componentes */}
            <div>
                <Route path="/cuentas/lista" component={GetCuentas} />
                <Route path="/cuentas/crear" component={PostCuenta} />
                <Route path="/cuentas/editar" component={PutCuentas} />
                <Route path="/cuentas/eliminar" component={DeleteCuenta} />
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
    @media (max-width: 768px) {
        padding: 0.75rem;
    }
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
    background: ${({ theme }) => theme.bg};
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
    background: ${({ theme, $active }) => $active ? theme.bg4 : theme.bg2};
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
