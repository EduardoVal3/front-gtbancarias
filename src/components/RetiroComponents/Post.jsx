import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, SimpleItem, RequiredRule, CustomRule } from "devextreme-react/form";
import styled, { ThemeContext } from "styled-components";
import { Button } from "devextreme-react/button";
import { v } from "../../styles/Variables";
import notify from "devextreme/ui/notify";
import { getCuentasBancarias } from "../../services/cuentaBancariaService";
import { createRetiro } from "../../services/retiroService";

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
  .dx-form-item-content { margin-bottom: 1rem; }
  .dx-texteditor-input {
    padding: 0.4rem;
    border: 1px solid ${({ theme }) => theme.gray500};
    transition: border-color 0.3s ease;
    &:focus { border-color: ${({ theme }) => theme.primary}; }
  }
  .dx-field-item-label-text { color: ${({ theme }) => theme.text}; font-weight: 500; }
  .dx-validation-summary { margin-top: 1rem; }
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
    &:active { transform: translateY(0); }
  }
`;

const PostRetiro = () => {
  const theme = useContext(ThemeContext);
  const formRef = useRef(null);
  const [cuentas, setCuentas] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({
    cuentaId: 0,
    monto: 0,
    hechoPor: "",
    descripcion: "",
    cuentaDetalle: "",
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCuentasBancarias();
        setCuentas(data);
      } catch (error) {
        console.error("Error al cargar cuentas:", error);
        notify("Error al cargar lista de cuentas", "error", 4000);
      }
    })();
  }, []);

  const handleFieldDataChanged = ({ dataField, value }) => {
    setFormData(prev => {
      const next = { ...prev, [dataField]: value };
      if (dataField === "cuentaId") {
        const cuenta = cuentas.find(c => c.Id === value);
        next.cuentaDetalle = cuenta
          ? `${cuenta.NumeroCuenta} ($${cuenta.Saldo.toFixed(2)})`
          : "";
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    const form = formRef.current?.instance;
    if (!form || !form.validate().isValid) return;

    try {
      const payload = (({ cuentaDetalle, ...p }) => p)(formData);
      await createRetiro(payload);
      notify("Retiro realizado exitosamente", "success", 4000);
      form.resetValues();
      setFormData({ cuentaId: 0, monto: 0, hechoPor: "", descripcion: "", cuentaDetalle: "" });
    } catch (error) {
      console.error("❌ Error al realizar el retiro:", error);
      notify("Error al registrar el retiro", "error", 4000);
    }
  };

  return (
    <Container theme={theme}>
      <FormWrapper>
        <Title theme={theme}>Registrar Retiro</Title>
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
            dataField="cuentaId"
            label={{ text: "Cuenta Origen" }}
            editorType="dxSelectBox"
            editorOptions={{
              items: cuentas,
              valueExpr: "Id",
              displayExpr: item =>
                item ? `${item.Id} - ${item.NumeroCuenta} - $${item.Saldo.toFixed(2)}` : "",
              placeholder: "Seleccione una cuenta",
              searchEnabled: true,
            }}
          >
            <RequiredRule message="Debe seleccionar una cuenta." />
          </SimpleItem>

          <SimpleItem dataField="monto" label={{ text: "Monto" }} editorType="dxNumberBox">
            <RequiredRule message="Debe ingresar un monto." />
            <CustomRule message="El monto debe ser mayor que 0." validationCallback={e => e.value > 0} />
          </SimpleItem>

          <SimpleItem dataField="hechoPor" label={{ text: "Hecho por" }}>
            <RequiredRule message="Debe indicar quién realiza el retiro." />
          </SimpleItem>

          <SimpleItem dataField="descripcion" label={{ text: "Descripción" }}>
            <RequiredRule message="Debe ingresar una descripción." />
          </SimpleItem>

          <SimpleItem colSpan={2}>
            <ButtonWrapper>
              <StyledButton
                theme={theme}
                text="Registrar Retiro"
                type="success"
                onClick={handleSubmit}
              />
            </ButtonWrapper>
          </SimpleItem>
        </ResponsiveForm>
      </FormWrapper>

      <PreviewPanel theme={theme}>
        <h3>Vista previa del retiro</h3>
        <p><span>Cuenta:</span> {formData.cuentaDetalle || "–"}</p>
        <p><span>Monto a retirar:</span> {`$${formData.monto.toFixed(2)}`}</p>
        <p><span>Hecho por:</span> {formData.hechoPor || "–"}</p>
        <p><span>Descripción:</span> {formData.descripcion || "–"}</p>
      </PreviewPanel>
    </Container>
  );
};

export default PostRetiro;
