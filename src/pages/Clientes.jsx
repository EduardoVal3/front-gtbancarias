import styled from "styled-components";
import { v } from "../styles/Variables";
import GetClientes from "../components/GetClientes";
import { FaUser } from "react-icons/fa";
import { Link, Route } from "wouter";
import { DeleteClient } from "../components/DeleteClient";


export function Clientes() {
    return (
        <Container>
            <h1>Gestiona los clientes</h1>

            <div>
                <Link href="/getclientes">
                    <a className="link">Get Clientes</a>
                </Link>
                <Link href="/deletecliente">
                    <a className="link">Eliminar Cliente</a>
                </Link>
                
                <Route path="/getclientes" component={GetClientes} />
                <Route path="/deletecliente" component={DeleteClient} />
            </div>
            
        </Container>
    );
}



// Estilos
const Container = styled.div`
    height:100vh;
    padding:20px;
`;

