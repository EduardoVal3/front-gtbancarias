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
import { createTransferencia } from "../../services/transferenciaService";
import { getCuentasBancarias } from "../../services/cuentaBancariaService";

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

const PostTransferencia = () => {
  const theme = useContext(ThemeContext);
  const formRef = useRef(null);
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    const cargarCuentas = async () => {
      try {
        const data = await getCuentasBancarias();
        setCuentas(data);
      } catch (error) {
        console.error("Error al cargar cuentas:", error);
        notify("Error al cargar la lista de cuentas", "error", 4000);
      }
    };

    cargarCuentas();
  }, []);

  const handleButtonClick = async () => {
    const formInstance = formRef.current?.instance;

    if (formInstance) {
      const result = formInstance.validate();

      if (result.isValid) {
        const formData = formInstance.option("formData");

        try {
          await createTransferencia(formData);
          notify("Transferencia realizada exitosamente", "success", 4000);
          formInstance.resetValues();
        } catch (error) {
          console.error("❌ Error al realizar la transferencia:", error);
          notify("Error al registrar la transferencia", "error", 4000);
        }
      }
    }
  };

  return (
    <Container theme={theme}>
      <Title theme={theme}>Registrar Transferencia</Title>
      <ResponsiveForm
        ref={formRef}
        colCount={window.innerWidth > 768 ? 2 : 1}
        showColonAfterLabel={true}
        showValidationSummary={true}
        formData={{
          cuentaOrigenId: 0,
          cuentaDestinoId: 0,
          monto: 0,
          descripcion: "",
          hechoPor: "",
        }}
      >
        <SimpleItem
          dataField="cuentaOrigenId"
          label={{ text: "Cuenta Origen" }}
          editorType="dxSelectBox"
          editorOptions={{
            items: cuentas,
            valueExpr: "Id",
            displayExpr: (item) => item ? `${item.Id} - ${item.NumeroCuenta} - ${item.Saldo}` : "",
            placeholder: "Seleccione una cuenta origen",
            searchEnabled: true,
          }}
        >
          <RequiredRule message="Debe seleccionar la cuenta origen" />
        </SimpleItem>

        <SimpleItem
          dataField="cuentaDestinoId"
          label={{ text: "Cuenta Destino" }}
          editorType="dxSelectBox"
          editorOptions={{
            items: cuentas,
            valueExpr: "Id",
            displayExpr: (item) => item ? `${item.Id} - ${item.NumeroCuenta} - ${item.Saldo}` : "",
            placeholder: "Seleccione una cuenta destino",
            searchEnabled: true,
          }}
        >
          <RequiredRule message="Debe seleccionar la cuenta destino" />
        </SimpleItem>

        <SimpleItem
          dataField="monto"
          label={{ text: "Monto" }}
          editorType="dxNumberBox"
        >
          <RequiredRule message="Debe ingresar un monto" />
        </SimpleItem>

        <SimpleItem
          dataField="descripcion"
          label={{ text: "Descripción" }}
        >
          <RequiredRule message="Debe ingresar una descripción" />
        </SimpleItem>

        <SimpleItem
          dataField="hechoPor"
          label={{ text: "Hecho por" }}
        >
          <RequiredRule message="Debe ingresar quién realiza la transferencia" />
        </SimpleItem>

        <SimpleItem colSpan={2}>
          <ButtonWrapper>
            <StyledButton
              theme={theme}
              text="Registrar Transferencia"
              type="success"
              onClick={handleButtonClick}
            />
          </ButtonWrapper>
        </SimpleItem>
      </ResponsiveForm>
    </Container>
  );
};

export default PostTransferencia;
