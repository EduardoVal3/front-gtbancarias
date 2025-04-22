import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  SimpleItem,
  RequiredRule,
  RangeRule,
  CustomRule,
} from "devextreme-react/form";
import styled, { ThemeContext } from "styled-components";
import { Button } from "devextreme-react/button";
import { v } from "../../styles/Variables";
import notify from "devextreme/ui/notify";

import { getClientes } from "../../services/clienteService";
import { createPrestamoPersonal } from "../../services/prestamoPersonalService";
import { PiPlaceholder } from "react-icons/pi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  border-radius: ${v.borderRadius};
  padding: ${v.lgSpacing};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow-x: auto;

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

const FormWrapper = styled.div`
  flex: 2;
`;

const PreviewPanel = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  padding: ${v.mdSpacing};
  border-radius: ${v.borderRadius};
  margin-top: ${v.lgSpacing};

  @media (min-width: 769px) {
    margin-top: 0;
    margin-left: ${v.lgSpacing};
    flex: 1;
    max-width: 300px;
  }

  h3 {
    margin-top: 0;
    color: ${({ theme }) => theme.textprimary};
    font-size: ${({ theme }) => theme.fontlg};
  }
  p {
    margin: 0.5rem 0;
    font-size: ${({ theme }) => theme.fontmd};
  }
  strong {
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
  }
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

const PostPrestamoPersonal = () => {
  const theme = useContext(ThemeContext);
  const formRef = useRef(null);

  const [clientes, setClientes] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({
    clienteId: 0,
    montoPrestamo: 0,
    tasaInteres: 0,
    cuotasPendientes: 0,
    fechaPago: new Date(),
    tipoString: "Activo",
    finalidad: "",
    cuotaMensual: 0,
  });

  // Detectar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cargar clientes
  useEffect(() => {
    (async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
        notify("Error al cargar la lista de clientes", "error", 4000);
      }
    })();
  }, []);

  // Recalcular cuota mensual al cambiar monto, tasa o cuotas
  const handleFieldDataChanged = ({ dataField, value }) => {
    setFormData(prev => {
      const next = { ...prev, [dataField]: value };
      if (
        ["montoPrestamo", "tasaInteres", "cuotasPendientes"].includes(dataField)
      ) {
        const { montoPrestamo, tasaInteres, cuotasPendientes } = next;
        next.cuotaMensual =
          cuotasPendientes > 0
            ? (montoPrestamo * (tasaInteres / 100)) / cuotasPendientes
            : 0;
      }
      return next;
    });
  };

  // Envío del formulario
  const handleSubmit = async () => {
    const formInstance = formRef.current?.instance;
    if (!formInstance) return;
    if (!formInstance.validate().isValid) return;

    const { cuotaMensual, ...payload } = formData;
    try {
      await createPrestamoPersonal(payload);
      notify("Préstamo personal registrado con éxito", "success", 4000);
      formInstance.resetValues();
      setFormData({
        clienteId: 0,
        montoPrestamo: 0,
        tasaInteres: 0,
        cuotasPendientes: 0,
        fechaPago: new Date(),
        tipoString: "Activo",
        finalidad: "",
        cuotaMensual: 0,
      });
    } catch (error) {
      console.error("❌ Error al crear préstamo personal:", error);
      notify("Error al registrar el préstamo", "error", 4000);
    }
  };
  
  // cliente seleccionado para la vista previa
  const clienteSel = clientes.find(c => c.Id === formData.clienteId);

  return (
    <Container theme={theme}>
      <FormWrapper>
        <Title theme={theme}>Registrar Préstamo Personal</Title>
        <ResponsiveForm
          ref={formRef}
          formData={formData}
          onFieldDataChanged={handleFieldDataChanged}
          colCount={isMobile ? 1 : 2}
          labelLocation={isMobile ? "top" : "left"}
          showColonAfterLabel={!isMobile}
          showValidationSummary={true}
        >
          <SimpleItem
            dataField="clienteId"
            label={{ text: "Cliente" }}
            editorType="dxSelectBox"
            editorOptions={{
              items: clientes,
              valueExpr: "Id",
              displayExpr: item =>
                item ? `${item.Id} - ${item.Nombre} ${item.Apellido}` : "",
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
            <RequiredRule message="Debe ingresar el monto" />
            <RangeRule min={0.01} message="Debe ser mayor que cero" />
          </SimpleItem>

          <SimpleItem
            dataField="tasaInteres"
            label={{ text: "Tasa de Interés (%)" }}
            editorType="dxNumberBox"
            editorOptions={{ showSpinButtons: true, step: 0.01 }}
          >
            <RequiredRule message="Debe ingresar la tasa" />
            <RangeRule min={0} max={100} message="0–100 %" />
          </SimpleItem>

          <SimpleItem
            dataField="cuotasPendientes"
            label={{ text: "Cuotas Pendientes" }}
            editorType="dxNumberBox"
          >
            <RequiredRule message="Debe indicar las cuotas" />
            <RangeRule min={1} message="Al menos 1 cuota" />
          </SimpleItem>

          <SimpleItem
            dataField="fechaPago"
            label={{ text: "Fecha de Pago" }}
            editorType="dxDateBox"
            editorOptions={{ displayFormat: "dd/MM/yyyy" }}
          >
            <RequiredRule message="Debe seleccionar la fecha" />
            <CustomRule
              validationCallback={() =>
                !(
                  formData.tipoString === "Vencido" &&
                  formData.fechaPago > new Date()
                )
              }
              message="Para vencidos, la fecha no puede ser futura"
            />
          </SimpleItem>

          <SimpleItem
            dataField="tipoString"
            label={{ text: "Estado" }}
            editorType="dxSelectBox"
            editorOptions={{ items: estadoOptions }}
          >
            <RequiredRule message="Debe seleccionar un estado" />
          </SimpleItem>

          <SimpleItem
            dataField="finalidad"
            label={{ text: "Finalidad" }}
            editorType="dxTextBox"
            editorOptions={{ placeholder: "e.g. Compra de vehículo, Vacaciones…" }}
          >
            <RequiredRule message="Debe indicar la finalidad" />
          </SimpleItem>

          <SimpleItem
            dataField="cuotaMensual"
            label={{ text: "Cuota Mensual" }}
            editorType="dxNumberBox"
            colSpan={2}
            editorOptions={{
              readOnly: true,
              format: { type: "fixedPoint", precision: 2 },
            }}
          />

          <SimpleItem colSpan={2}>
            <ButtonWrapper>
              <StyledButton
                theme={theme}
                text="Registrar Préstamo Personal"
                type="success"
                onClick={handleSubmit}
              />
            </ButtonWrapper>
          </SimpleItem>
        </ResponsiveForm>
      </FormWrapper>

      <PreviewPanel theme={theme}>
        <h3>Vista previa del préstamo</h3>
        <p>
          <strong>Cliente:</strong>{" "}
          {clienteSel
            ? `${clienteSel.Nombre} ${clienteSel.Apellido}`
            : "—"}
        </p>
        <p>
          <strong>Monto:</strong> ${formData.montoPrestamo.toFixed(2)}
        </p>
        <p>
          <strong>Tasa:</strong> {formData.tasaInteres.toFixed(2)} %
        </p>
        <p>
          <strong>Cuotas:</strong> {formData.cuotasPendientes}
        </p>
        <p>
          <strong>Cuota Mensual:</strong> ${formData.cuotaMensual.toFixed(2)}
        </p>
        <p>
          <strong>Fecha Pago:</strong>{" "}
          {formData.fechaPago.toLocaleDateString()}
        </p>
        <p>
          <strong>Estado:</strong> {formData.tipoString}
        </p>
        <p>
          <strong>Finalidad:</strong> {formData.finalidad}
        </p>
      </PreviewPanel>
    </Container>
  );
};

export default PostPrestamoPersonal;
