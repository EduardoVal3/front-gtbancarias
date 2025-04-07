import styled from "styled-components";
import ListaTransferencias from "../components/ListaTransferencias";
export function Home() {
  return (<Container className="contenedor">
    <h1>Home</h1>

    <h2>Prueba obtener transferencias</h2>
    <h2>Prueba</h2>
    <ListaTransferencias />
  </Container>);
}
const Container =styled.div`
  height:100vh;
  padding:30px
`

