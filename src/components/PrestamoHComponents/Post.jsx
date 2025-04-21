import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  SimpleItem,
  RequiredRule,
  RangeRule,
} from "devextreme-react/form";
import styled, { ThemeContext } from "styled-components";
import { Button } from "devextreme-react/button";
import { v } from "../../styles/Variables";
import notify from "devextreme/ui/notify";
import { getClientes } from "../../services/clienteService";
import { createPrestamoHipotecario } from "../../services/prestamoHipotecarioService";

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
    padding: 0.4rem;
    border: 1px solid ${({ theme }) => theme.gray500};
    transition: border-color 0.3s ease;

    &:focus {
      border-color: ${({ theme }) => theme.primary};
    }
  }

  .dx-field-item-label-text {
    color: ${({ theme }) => theme.text};
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

const estadoOptions = ["Activo", "Pagado", "Vencido"];

const PostPrestamoHipotecario = () => {
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
        notify("Error al cargar la lista de clientes", "error", 4000);
      }
    };
    cargarClientes();
  }, []);

  const handleSubmit = async () => {
    const formInstance = formRef.current?.instance;
    if (!formInstance) return;

    const result = formInstance.validate();
    if (!result.isValid) return;

    const formData = formInstance.option("formData");
    try {
      await createPrestamoHipotecario(formData);
      notify("Préstamo hipotecario registrado con éxito", "success", 4000);
      formInstance.resetValues();
    } catch (error) {
      console.error("❌ Error al crear préstamo:", error);
      notify("Error al registrar el préstamo", "error", 4000);
    }
  };

  return (
    <Container theme={theme}>
      <Title theme={theme}>Registrar Préstamo Hipotecario</Title>
      <ResponsiveForm
        ref={formRef}
        colCount={window.innerWidth > 768 ? 2 : 1}
        showColonAfterLabel={true}
        showValidationSummary={true}
        formData={{
          clienteId: 0,
          montoPrestamo: 0,
          tasaInteres: 0,
          cuotasPendientes: 0,
          fechaPago: new Date(),
          tipoString: "Activo",
          tipoPropiedad: "",
        }}
      >
        <SimpleItem
          dataField="clienteId"
          label={{ text: "Cliente" }}
          editorType="dxSelectBox"
          editorOptions={{
            items: clientes,
            valueExpr: "Id",
            displayExpr: (item) =>
              item ? `${item.Id} - ${item.Nombre} ${item.Apellido}` : "",
            placeholder: "Seleccione un cliente",
            searchEnabled: true,
          }}
        >
          <RequiredRule message="Debe seleccionar un cliente" />
        </SimpleItem>

        <SimpleItem
          dataField="montoPrestamo"
          label={{ text: "Monto del Préstamo" }}
          editorType="dxNumberBox"
        >
          <RequiredRule message="Debe ingresar el monto del préstamo" />
          <RangeRule min={0.01} message="Debe ser mayor que cero" />
        </SimpleItem>

        <SimpleItem
          dataField="tasaInteres"
          label={{ text: "Tasa de Interés (%)" }}
          editorType="dxNumberBox"
          editorOptions={{ showSpinButtons: true, step: 0.01 }}
        >
          <RequiredRule message="Debe ingresar la tasa de interés" />
          <RangeRule min={0} max={100} message="0–100 %" />
        </SimpleItem>

        <SimpleItem
          dataField="cuotasPendientes"
          label={{ text: "Cuotas Pendientes" }}
          editorType="dxNumberBox"
        >
          <RequiredRule message="Debe indicar las cuotas pendientes" />
          <RangeRule min={1} message="Al menos 1 cuota" />
        </SimpleItem>

        <SimpleItem
          dataField="fechaPago"
          label={{ text: "Fecha de Pago" }}
          editorType="dxDateBox"
          editorOptions={{ displayFormat: "dd/MM/yyyy" }}
        >
          <RequiredRule message="Debe seleccionar la fecha de pago" />
        </SimpleItem>

        <SimpleItem
          dataField="tipoString"
          label={{ text: "Estado" }}
          editorType="dxSelectBox"
          editorOptions={{
            items: estadoOptions,
            placeholder: "Seleccione un estado",
          }}
        >
          <RequiredRule message="Debe seleccionar un estado" />
        </SimpleItem>

        <SimpleItem
          dataField="tipoPropiedad"
          label={{ text: "Tipo de Propiedad" }}
          editorType="dxTextBox"
          colSpan={2}
        >
          <RequiredRule message="Debe describir el tipo de propiedad" />
        </SimpleItem>

        <SimpleItem colSpan={2}>
          <ButtonWrapper>
            <StyledButton
              theme={theme}
              text="Registrar Préstamo Hipotecario"
              type="success"
              onClick={handleSubmit}
            />
          </ButtonWrapper>
        </SimpleItem>
      </ResponsiveForm>
    </Container>
  );
};

export default PostPrestamoHipotecario;
