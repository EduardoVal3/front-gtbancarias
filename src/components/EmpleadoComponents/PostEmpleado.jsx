// PostEmpleado.jsx
import React, { useContext, useRef } from "react";
import {
  Form,
  SimpleItem,
  RequiredRule,
  EmailRule,
  PatternRule
} from "devextreme-react/form";
import styled, { ThemeContext } from "styled-components";
import { Button } from "devextreme-react/button";
import { v } from "../../styles/Variables";
import notify from "devextreme/ui/notify";
import { createEmpleado } from "../../services/empleadoService";


const Container = styled.div`
  height: auto;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  border-radius: ${v.borderRadius};
  padding: ${v.lgSpacing};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textprimary};
  margin-bottom: 1.5rem;
  font-size: ${({ theme }) => theme.fontxl};
  text-align: center;
  line-height: 1;
`;

const ResponsiveForm = styled(Form)`
  .dx-form-item-content {
    margin-bottom: 1rem;
  }

  .dx-texteditor-input {
    padding: 0.40rem;
    border: 1px solid ${({ theme }) => theme.gray500};
    transition: border-color 0.3s ease;

    &:focus {
      border-color: ${({ theme }) => theme.primary};
    }
  }

  .dx-field-item-label-text {
    color: ${(props) => props.theme.text};
    font-weight: 500;
  }

  .dx-validation-summary {
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .dx-form-item-label {
      font-size: ${({ theme }) => theme.fontsm};
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1rem;
    background-color: ${({ theme }) => theme.bg4};
    color: ${({ theme }) => theme.white};
    font-size: ${({ theme }) => theme.fontButton};
    border-radius: 6px;
    padding: 12px 24px;
    border: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
      background-color: ${({ theme }) => theme.primary};
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

const tipoEmpleadoOptions = ["Cajero", "Gerente", "Asistente", "Auditor"];

const PostEmpleado = () => {
  const theme = useContext(ThemeContext);
  const formRef = useRef(null);

  const handleButtonClick = async () => {
    const formInstance = formRef.current?.instance;

    if (formInstance) {
      const result = formInstance.validate();

      if (result.isValid) {
        const formData = formInstance.option("formData");

        try {
          await createEmpleado(formData);
          console.log("✅ Empleado creado:", formData);
          notify("Empleado registrado exitosamente", "success", 3000);
          formInstance.option("formData", {
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            direccion: "",
            tipo: "",
          });
        } catch (error) {
          console.error("❌ Error al registrar empleado:", error);
          notify("Error al registrar empleado. Verifique que el email no esté en uso", "error", 4000);
        }
      }
    }
  };

  return (
    <Container theme={theme}>
      <Title theme={theme}>Registrar nuevo empleado</Title>
      <ResponsiveForm
        ref={formRef}
        colCount={window.innerWidth > 768 ? 2 : 1}
        showColonAfterLabel={true}
        showValidationSummary={true}
        formData={{
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            direccion: "",
            tipo: "",
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
          <EmailRule message="Correo inválido" />
        </SimpleItem>

        <SimpleItem dataField="telefono" label={{ text: "Teléfono" }}>
          <RequiredRule message="El teléfono es obligatorio" />
          <PatternRule pattern={/^[0-9]+$/} message="Solo se permiten números" />
        </SimpleItem>

        <SimpleItem dataField="direccion" label={{ text: "Dirección" }}>
          <RequiredRule message="La dirección es obligatoria" />
        </SimpleItem>

        <SimpleItem
          dataField="tipo"
          label={{ text: "Cargo" }}
          editorType="dxSelectBox"
          editorOptions={{
            items: tipoEmpleadoOptions,
            placeholder: "Seleccione un tipo",
          }}
        >
          <RequiredRule message="Debe seleccionar un tipo de empleado" />
        </SimpleItem>

        <SimpleItem colSpan={2}>
          <ButtonWrapper>
            <StyledButton
              theme={theme}
              text="Registrar Empleado"
              type="success"
              onClick={handleButtonClick}
            />
          </ButtonWrapper>
        </SimpleItem>
      </ResponsiveForm>
    </Container>
  );
};

export default PostEmpleado;
