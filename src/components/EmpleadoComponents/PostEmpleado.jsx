import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  SimpleItem,
  RequiredRule,
  EmailRule,
  PatternRule,
} from "devextreme-react/form";
import styled, { ThemeContext } from "styled-components";
import { Button } from "devextreme-react/button";
import { v } from "../../styles/Variables";
import notify from "devextreme/ui/notify";
import { createEmpleado } from "../../services/empleadoService";

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

const tipoEmpleadoOptions = ["Cajero", "Gerente", "Asistente", "Auditor"];

const PostEmpleado = () => {
  const theme = useContext(ThemeContext);
  const formRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    tipo: "",
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleFieldDataChanged = ({ dataField, value }) => {
    setFormData(prev => ({ ...prev, [dataField]: value }));
  };

  const handleSubmit = async () => {
    const formInstance = formRef.current?.instance;
    if (!formInstance) return;

    const validation = formInstance.validate();
    if (!validation.isValid) return;

    try {
      await createEmpleado(formData);
      notify("Empleado registrado exitosamente", "success", 4000);
      formInstance.resetValues();
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        tipo: "",
      });
    } catch (error) {
      console.error("❌ Error al registrar empleado:", error);
      notify("Error al registrar empleado. Verifique los datos", "error", 4000);
    }
  };

  return (
    <Container theme={theme}>
      <FormWrapper>
        <Title theme={theme}>Registrar nuevo empleado</Title>
        <ResponsiveForm
          ref={formRef}
          formData={formData}
          onFieldDataChanged={handleFieldDataChanged}
          colCount={isMobile ? 1 : 2}
          labelLocation={isMobile ? "top" : "left"}
          showColonAfterLabel={!isMobile}
          showValidationSummary={true}
        >
          <SimpleItem dataField="nombre" label={{ text: "Nombres" }}>
            <RequiredRule message="El nombre es obligatorio" />
          </SimpleItem>

          <SimpleItem dataField="apellido" label={{ text: "Apellidos" }}>
            <RequiredRule message="El apellido es obligatorio" />
          </SimpleItem>

          <SimpleItem dataField="email" label={{ text: "Correo" }}>
            <RequiredRule message="El correo es obligatorio" />
            <EmailRule message="Correo inválido" />
          </SimpleItem>

          <SimpleItem dataField="telefono" label={{ text: "Teléfono" }}>
            <RequiredRule message="El teléfono es obligatorio" />
            <PatternRule
              pattern={/^\d{7,15}$/}
              message="Solo números (7–15 dígitos)"
            />
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
              placeholder: "Seleccione un cargo",
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
                onClick={handleSubmit}
              />
            </ButtonWrapper>
          </SimpleItem>
        </ResponsiveForm>
      </FormWrapper>

      <PreviewPanel theme={theme}>
        <h3>Vista previa del empleado</h3>
        <p><span>Nombres:</span> {formData.nombre || "—"}</p>
        <p><span>Apellidos:</span> {formData.apellido || "—"}</p>
        <p><span>Correo:</span> {formData.email || "—"}</p>
        <p><span>Teléfono:</span> {formData.telefono || "—"}</p>
        <p><span>Dirección:</span> {formData.direccion || "—"}</p>
        <p><span>Cargo:</span> {formData.tipo || "—"}</p>
      </PreviewPanel>
    </Container>
  );
};

export default PostEmpleado;