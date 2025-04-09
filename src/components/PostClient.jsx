import React, { useContext } from "react";
import { Form, SimpleItem, RequiredRule, EmailRule, PatternRule } from "devextreme-react/form";
import styled, { ThemeContext } from "styled-components";
import { Button } from "devextreme-react/button";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgtotal};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
  max-width: 700px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textprimary};
  margin-bottom: 1.5rem;
  font-size: ${({ theme }) => theme.fontxl};
  text-align: center;
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1.5rem;
    background-color: ${({ theme }) => theme.bg4};
    color: ${({ theme }) => theme.white};
    font-size: ${({ theme }) => theme.fontButton};
    border-radius: 6px;
    padding: 10px 20px;
    border: none;
    transition: background 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.primary};
    }
  }
`;

const PostClient = () => {
  const theme = useContext(ThemeContext);

  const handleSubmit = (e) => {
    const formData = e.component.option("formData");
    console.log("Datos del formulario:", formData);
    // Aquí llamas a tu servicio Axios para hacer el POST
  };

  return (
    <Container theme={theme}>
      <Title theme={theme}>Registrar nuevo cliente</Title>
      <Form
        colCount={2}
        showColonAfterLabel={true}
        showValidationSummary={true}
        onContentReady={(e) => e.component.validate()}
        onSubmit={handleSubmit}
        formData={{
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          direccion: ""
        }}
      >
        <SimpleItem dataField="nombre" label={{ text: "Nombre" }}>
          <RequiredRule message="El nombre es obligatorio" />
        </SimpleItem>

        <SimpleItem dataField="apellido" label={{ text: "Apellido" }}>
          <RequiredRule message="El apellido es obligatorio" />
        </SimpleItem>

        <SimpleItem dataField="email" label={{ text: "Correo" }}>
          <RequiredRule message="El correo es obligatorio" />
          <EmailRule message="Correo electrónico no válido" />
        </SimpleItem>

        <SimpleItem dataField="telefono" label={{ text: "Teléfono" }}>
          <RequiredRule message="El teléfono es obligatorio" />
          <PatternRule 
            pattern={/^\d{7,15}$/} 
            message="Número inválido (7-15 dígitos)" 
          />
        </SimpleItem>

        <SimpleItem dataField="direccion" label={{ text: "Dirección" }} colSpan={2}>
          <RequiredRule message="La dirección es obligatoria" />
        </SimpleItem>

        <SimpleItem colSpan={2}>
          <StyledButton
            theme={theme}
            text="Registrar"
            type="success"
            useSubmitBehavior={true}
          />
        </SimpleItem>
      </Form>
    </Container>
  );
};

export default PostClient;
