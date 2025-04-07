import styled from "styled-components";
import ListaTransferencias from "../components/ListaTransferencias";
export function Transacciones() {
  return (<Container className="contenedor">
    <h1>Lista de transferencias</h1>
    <ListaTransferencias />
  </Container>);
}
const Container =styled.div`
  height:100vh;
  padding:20px
`