import React, { useContext } from "react";
import {
  Form,
  SimpleItem,
  RequiredRule,
  EmailRule,
  PatternRule,
} from "devextreme-react/form";
import styled, { ThemeContext } from "styled-components";
import { Button } from "devextreme-react/button";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgtotal};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%; /* Adapta al 100% en móviles */
  margin: 0 auto;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem; /* Menos padding en móviles */
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textprimary};
  margin-bottom: 1.5rem;
  font-size: ${({ theme }) => theme.fontxl};
  text-align: center;
  line-height: 1.2; /* Mejora legibilidad en móviles */
`;

const ResponsiveForm = styled(Form)`
  .dx-form-item-content {
    margin-bottom: 1rem; /* Espaciado entre campos */
  }

  .dx-texteditor-input {
    padding: 0.75rem; /* Más espacio en los inputs */
    
    border: 1px solid ${({ theme }) => theme.gray500};
    transition: border-color 0.3s ease;

    &:focus {
      border-color: ${({ theme }) => theme.primary}; /* Efecto al enfocar */
    }
  }

  .dx-validation-summary {
    margin-top: 1rem;
    color: ${({ theme }) => theme.red500}; /* Color de errores */
  }

  @media (max-width: 768px) {
    .dx-form-item-label {
      font-size: ${({ theme }) => theme.fontsm}; /* Tamaño de texto reducido */
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1.5rem;
    background-color: ${({ theme }) => theme.bg4};
    color: ${({ theme }) => theme.white};
    font-size: ${({ theme }) => theme.fontButton};
    border-radius: 6px;
    padding: 12px 24px; /* Más espacio en el botón */
    border: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px); /* Efecto de elevación */
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); /* Sombra suave */
      background-color: ${({ theme }) => theme.primary}; /* Gradiente suave */
    }

    &:active {
      transform: translateY(0); /* Regresa al estado normal */
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
      <ResponsiveForm
        colCount={window.innerWidth > 768 ? 2 : 1} // Columnas responsivas
        showColonAfterLabel={true}
        showValidationSummary={true}
        onContentReady={(e) => e.component.validate()}
        onSubmit={handleSubmit}
        formData={{
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          direccion: "",
        }}
      >
        <SimpleItem dataField="nombre" label={{ text: "Nombre" }}>
          <RequiredRule message="El nombre es obligatorio" />
        </SimpleItem>

        <SimpleItem dataField="apellido" label={{ text: "Apellido" }}>
          <RequiredRule message="El apellido es obligatorio" />
        </SimpleItem>

        <SimpleItem dataField="email" label={{ text: "Correo electrónico" }}>
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

        <SimpleItem
          dataField="direccion"
          label={{ text: "Dirección" }}
          colSpan={2}
        >
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
      </ResponsiveForm>
    </Container>
  );
};

export default PostClient;

