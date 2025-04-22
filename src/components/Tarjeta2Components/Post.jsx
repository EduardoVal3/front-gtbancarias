import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  SimpleItem,
  RequiredRule,
  PatternRule,
  CustomRule,
} from "devextreme-react/form";
import styled, { ThemeContext } from "styled-components";
import { Button } from "devextreme-react/button";
import { v } from "../../styles/Variables";
import notify from "devextreme/ui/notify";
import { getClientes } from "../../services/clienteService";
import { createTarjetaDebito } from "../../services/tarjetaDebitoService";

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
  span {
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textprimary};
  margin-bottom: ${v.lgSpacing};
  font-size: ${({ theme }) => theme.fontxl};
  text-align: center;
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
  margin-top: ${v.mdSpacing};
`;

const StyledButton = styled(Button)`
  && {
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({
    numeroTarjeta: "",
    fechaExpiracion: new Date(),
    cvv: "",
    saldoDisponible: 0,
    clienteId: 0,
    clienteNombre: "",
  });

  // para el responsive
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // carga clientes
  useEffect(() => {
    (async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        console.error("Error al cargar clientes:", err);
        notify("Error al cargar la lista de clientes", "error", 4000);
      }
    })();
  }, []);

  // Uctualizar el formulario y el preview
  const handleFieldDataChanged = ({ dataField, value }) => {
    setFormData(prev => {
      const next = { ...prev, [dataField]: value };
      if (dataField === "clienteId") {
        const c = clientes.find(cl => cl.Id === value);
        next.clienteNombre = c ? `${c.Nombre} ${c.Apellido}` : "";
      }
      return next;
    });
  };

  // Enviar
  const handleSubmit = async () => {
    const form = formRef.current?.instance;
    if (!form || !form.validate().isValid) return;

    try {
      const payload = (({ clienteNombre, ...p }) => p)(formData);
      await createTarjetaDebito(payload);
      notify("Tarjeta de débito registrada exitosamente", "success", 4000);

      form.resetValues();
      setFormData({
        numeroTarjeta: "",
        fechaExpiracion: new Date(),
        cvv: "",
        saldoDisponible: 0,
        clienteId: 0,
        clienteNombre: "",
      });
    } catch (err) {
      console.error("❌ Error al crear tarjeta:", err);
      notify("Error al registrar la tarjeta de débito. Verifique si el número de tarjeta ya está en uso", "error", 4000);
    }
  };

  return (
    <Container theme={theme}>
      <FormWrapper>
        <Title theme={theme}>Registrar tarjeta de crédito</Title>
        <ResponsiveForm
          ref={formRef}
          formData={formData}
          onFieldDataChanged={handleFieldDataChanged}
          colCount={isMobile ? 1 : 2}
          labelLocation={isMobile ? "top" : "left"}
          showColonAfterLabel={!isMobile}
          showValidationSummary
        >
          <SimpleItem
            dataField="numeroTarjeta"
            label={{ text: "Número de tarjeta" }}
            editorOptions={{ placeholder: "16 dígitos" }}
            helpText="Solo números, sin espacios."
          >
            <RequiredRule message="El número es obligatorio." />
            <PatternRule
              pattern={/^\d{16}$/}
              message="Debe ser exactamente 16 dígitos."
            />
          </SimpleItem>

          <SimpleItem
            dataField="fechaExpiracion"
            label={{ text: "Fecha expiración" }}
            editorType="dxDateBox"
            editorOptions={{ displayFormat: "MM/yyyy", pickerType: "rollers" }}
          >
            <RequiredRule message="La fecha es obligatoria." />
            <CustomRule
              message="La fecha debe ser futura."
              validationCallback={e => e.value > new Date()}
            />
          </SimpleItem>

          <SimpleItem
            dataField="cvv"
            label={{ text: "CVV" }}
            editorOptions={{ placeholder: "3 dígitos" }}
          >
            <RequiredRule message="El CVV es obligatorio." />
            <PatternRule
              pattern={/^\d{3}$/}
              message="Debe ser un número de 3 dígitos."
            />
          </SimpleItem>

          <SimpleItem
            dataField="saldoDisponible"
            label={{ text: "Saldo disponible" }}
            editorType="dxNumberBox"
          >
            <RequiredRule message="El saldo pendiente es obligatorio." />
            <CustomRule
              message="Debe ser ≥ 0."
              validationCallback={e => e.value >= 0}
            />
          </SimpleItem>

          <SimpleItem
            dataField="clienteId"
            label={{ text: "Cliente" }}
            editorType="dxSelectBox"
            editorOptions={{
              items: clientes,
              valueExpr: "Id",
              displayExpr: item =>
                item ? `${item.Id} - ${item.Nombre} ${item.Apellido}` : "",
              placeholder: "Seleccione un cliente",
              searchEnabled: true,
            }}
          >
            <RequiredRule message="Seleccione un cliente." />
          </SimpleItem>

          <SimpleItem colSpan={2}>
            <ButtonWrapper>
              <StyledButton
                theme={theme}
                text="Registrar Tarjeta"
                type="success"
                onClick={handleSubmit}
              />
            </ButtonWrapper>
          </SimpleItem>
        </ResponsiveForm>
      </FormWrapper>

      <PreviewPanel theme={theme}>
        <h3>Vista previa de la tarjeta</h3>
        <p>
          <span>Nº Tarjeta:</span>{" "}
          {formData.numeroTarjeta
            ? formData.numeroTarjeta.replace(/\d{12}(\d{4})/, "•••• •••• •••• $1")
            : "–"}
        </p>
        <p>
          <span>Expira:</span>{" "}
          {formData.fechaExpiracion.toLocaleDateString("es-ES", {
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p>
          <span>CVV:</span>{" "}
          {formData.cvv ? "***" : "–"}
        </p>
        <p>
          <span>Saldo Disponible:</span> ${formData.saldoDisponible.toFixed(2)}
        </p>
        <p>
          <span>Cliente:</span> {formData.clienteNombre || "–"}
        </p>
      </PreviewPanel>
    </Container>
  );
};

export default PostTarjetaDebito;