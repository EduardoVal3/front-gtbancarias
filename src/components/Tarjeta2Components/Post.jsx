import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  SimpleItem,
  RequiredRule,
  PatternRule
} from "devextreme-react/form";
import styled, { ThemeContext } from "styled-components";
import { Button } from "devextreme-react/button";
import { v } from "../../styles/Variables";
import notify from "devextreme/ui/notify";
import { getClientes } from "../../services/clienteService";
import { createTarjetaDebito } from "../../services/tarjetaDebitoService";

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

const PostTarjetaDebito = () => {
  const theme = useContext(ThemeContext);
  const formRef = useRef(null);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
        notify("Error al cargar la lista de clientes", "error", 3000);
      }
    };

    cargarClientes();
  }, []);

  const handleButtonClick = async () => {
    const formInstance = formRef.current?.instance;

    if (formInstance) {
      const result = formInstance.validate();

      if (result.isValid) {
        const formData = formInstance.option("formData");

        try {
          await createTarjetaDebito(formData);
          notify("Tarjeta de débito creada exitosamente", "success", 3000);
          formInstance.option("formData", {
            numeroTarjeta: "",
            fechaExpiracion: "",
            cvv: "",
            saldoDisponible: 0,
            clienteId: 0,
          });
        } catch (error) {
          console.error("❌ Error al crear tarjeta:", error);
          notify("Error al registrar la tarjeta de débito", "error", 3000);
        }
      }
    }
  };

  return (
    <Container theme={theme}>
      <Title theme={theme}>Registrar tarjeta de débito</Title>
      <ResponsiveForm
        ref={formRef}
        colCount={window.innerWidth > 768 ? 2 : 1}
        showColonAfterLabel={true}
        showValidationSummary={true}
        formData={{
          numeroTarjeta: "",
          fechaExpiracion: "",
          cvv: "",
          saldoDisponible: 0,
          clienteId: 0,
        }}
      >
        <SimpleItem dataField="numeroTarjeta" label={{ text: "Número de Tarjeta" }}>
          <RequiredRule message="Este campo es obligatorio" />
          <PatternRule
            pattern={/^\d{16}$/}
            message="Número inválido (16 dígitos)"
          />
        </SimpleItem>

        <SimpleItem
          dataField="fechaExpiracion"
          label={{ text: "Fecha de Expiración" }}
          editorType="dxDateBox"
          editorOptions={{ type: "date" }}
        >
          <RequiredRule message="Debe ingresar una fecha" />
        </SimpleItem>

        <SimpleItem dataField="cvv" label={{ text: "CVV" }}>
          <RequiredRule message="Este campo es obligatorio" />
          <PatternRule pattern="^\d{3}$" message="Debe ser un número de 3 dígitos" />
        </SimpleItem>

        <SimpleItem dataField="saldoDisponible" label={{ text: "Saldo Disponible" }} editorType="dxNumberBox">
          <RequiredRule message="Este campo es obligatorio" />
        </SimpleItem>

        <SimpleItem
          dataField="clienteId"
          label={{ text: "ClienteID" }}
          editorType="dxSelectBox"
          editorOptions={{
            items: clientes,
            valueExpr: "Id",
            displayExpr: (item) => item ? `${item.Id} - ${item.Nombre} ${item.Apellido}` : "",
            placeholder: "Seleccione un cliente",
            searchEnabled: true,
          }}
        >
          <RequiredRule message="Debe seleccionar un cliente" />
        </SimpleItem>

        <SimpleItem colSpan={2}>
          <ButtonWrapper>
            <StyledButton
              theme={theme}
              text="Registrar Tarjeta"
              type="success"
              onClick={handleButtonClick}
            />
          </ButtonWrapper>
        </SimpleItem>
      </ResponsiveForm>
    </Container>
  );
};

export default PostTarjetaDebito;
