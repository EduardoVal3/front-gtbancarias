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
import { createCuentaBancaria } from "../../services/cuentaBancariaService";
import { getClientes } from "../../services/clienteService";

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

const tipoCuentaOptions = ["Ahorro", "Corriente", "Empresarial"];

const PostCuenta = () => {
  const theme = useContext(ThemeContext);
  const formRef = useRef(null);

  const [clientes, setClientes] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({
    numeroCuenta: "",
    saldo: 0,
    tipoString: "",
    clienteId: 0,
    clienteNombre: "",
  });

  // Detecta la pantalla
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Carga los clientes
  useEffect(() => {
    (async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
        notify("Error al cargar la lista de clientes", "error", 3000);
      }
    })();
  }, []);

  // Uctualiza el formulario y el preview
  const handleFieldDataChanged = ({ dataField, value }) => {
    setFormData((prev) => {
      const next = { ...prev, [dataField]: value };
      if (dataField === "clienteId") {
        const c = clientes.find((cl) => cl.Id === value);
        next.clienteNombre = c ? `${c.Nombre} ${c.Apellido}` : "";
      }
      return next;
    });
  };

  // Enviar
  const handleSubmit = async () => {
    const form = formRef.current?.instance;
    if (!form) return;
    if (!form.validate().isValid) return;

    try {
      const payload = (({ clienteNombre, ...p }) => p)(formData);
      await createCuentaBancaria(payload);
      notify("Cuenta registrada exitosamente", "success", 3000);

      form.resetValues();
      setFormData({
        numeroCuenta: "",
        saldo: 0,
        tipoString: "",
        clienteId: 0,
        clienteNombre: "",
      });
    } catch (error) {
      console.error("❌ Error al registrar cuenta:", error);
      notify("Error al registrar la cuenta", "error", 4000);
    }
  };

  return (
    <Container theme={theme}>
      <FormWrapper>
        <Title theme={theme}>Registrar nueva cuenta bancaria</Title>
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
            dataField="numeroCuenta"
            label={{ text: "Número de cuenta" }}
            editorOptions={{ placeholder: "Ej: 1234567890" }}
            helpText="Exactamente 10 dígitos, solo números."
          >
            <RequiredRule message="El número de cuenta es obligatorio." />
            <PatternRule
              pattern={/^\d{10}$/}
              message="Formato inválido: ingrese exactamente 10 dígitos."
            />
          </SimpleItem>

          <SimpleItem
            dataField="saldo"
            label={{ text: "Saldo inicial" }}
            editorType="dxNumberBox"
          >
            <RequiredRule message="El saldo es obligatorio." />
            <CustomRule
              message="El saldo no puede ser negativo."
              validationCallback={(e) => e.value >= 0}
            />
          </SimpleItem>

          <SimpleItem
            dataField="tipoString"
            label={{ text: "Tipo de cuenta" }}
            editorType="dxSelectBox"
            editorOptions={{
              items: tipoCuentaOptions,
              placeholder: "Seleccione un tipo",
            }}
          >
            <RequiredRule message="Seleccione un tipo de cuenta." />
          </SimpleItem>

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
            <RequiredRule message="Debe seleccionar un cliente." />
          </SimpleItem>

          <SimpleItem colSpan={2}>
            <ButtonWrapper>
              <StyledButton
                theme={theme}
                text="Registrar Cuenta"
                type="success"
                onClick={handleSubmit}
              />
            </ButtonWrapper>
          </SimpleItem>
        </ResponsiveForm>
      </FormWrapper>

      <PreviewPanel theme={theme}>
        <h3>Vista previa de la cuenta</h3>
        <p>
          <span>N° Cuenta:</span> {formData.numeroCuenta || "–"}
        </p>
        <p>
          <span>Saldo:</span> {`$${formData.saldo.toFixed(2)}`}
        </p>
        <p>
          <span>Tipo:</span> {formData.tipoString || "–"}
        </p>
        <p>
          <span>Cliente:</span> {formData.clienteNombre || "–"}
        </p>
      </PreviewPanel>
    </Container>
  );
};

export default PostCuenta;