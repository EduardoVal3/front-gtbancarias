// components/ClienteComponents/GetClientes.jsx
import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  Column,
  Paging,
  SearchPanel,
  FilterRow,
  Selection,
  Export,
  ColumnChooser,
  Editing,
} from 'devextreme-react/data-grid';
import styled, { useTheme } from 'styled-components';
import { v } from '../../styles/Variables';
import notify from 'devextreme/ui/notify';
import { deleteDeposito, getDepositos } from '../../services/depositoService';

const GridWrapper = styled.div`
  
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  border-radius: ${v.borderRadius};
  padding: ${v.lgSpacing};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 0.35rem;
    .dx-toolbar .dx-toolbar-menu-container{
      padding-inline-end: 0.35rem;
    }
    .dx-pager .dx-pages .dx-page-indexes{
      padding: 0.50rem;
      font-size: 0.80rem;
      padding-inline-end: 0.50rem
    }
    .dx-datagrid-header-panel{
      padding-inline-end: 5.5px;
    } /*     */
  }
  .dx-datagrid {
    border: none;
    background-color: ${({ theme }) => theme.bgtotal};
    color: ${({ theme }) => theme.text};
    font-size: ${({ theme }) => theme.fontsm};
  }
  .dx-datagrid-content .dx-datagrid-table .dx-row .dx-command-select{
    padding: 0;
    width: 50px;
    min-width: 50px;
    max-width: 50px;
  }
  .dx-datagrid-content .dx-datagrid-table .dx-row .dx-command-edit {  
    width: 60px;min-width: 60px;  
  } 

  .dx-row-alt>td, .dx-datagrid .dx-row-alt>tr>td {
    background-color: ${(props) => props.theme.bg2};
  }
  .dx-widget{
    color: ${({ theme })=> theme.text}
  }
  .dx-datagrid-headers {
    background-color: ${({ theme }) => theme.bg3};
    color: ${({ theme }) => theme.text};
  }

  .dx-datagrid-rowsview .dx-row {
    background-color: ${({ theme }) => theme.bgtgderecha};
    transition: none !important;
  }

  .dx-datagrid-rowsview .dx-row:hover {
    background-color: ${({ theme }) => theme.bgtgderecha}; /* hover desactivado */
  }

  .dx-datagrid .dx-row-focused,
  .dx-datagrid .dx-selection {
    background-color: ${({ theme }) => theme.bg4} !important;
    color: #fff;
  }

  .dx-datagrid .dx-datagrid-export-button .dx-button-content {
    color: ${({ theme }) => theme.primary};
  }

  .dx-datagrid .dx-header-row .dx-datagrid-text-content {
    color: ${({ theme }) => theme.text};
  }
  .dx-datagrid-content .dx-datagrid-table{
    border-collapse: separate;
  }
  .dx-datagrid .dx-datagrid-content .dx-datagrid-table .dx-row td {
    border-color: ${({ theme }) => theme.gray500};
  }

  .dx-datagrid .dx-row-lines > td {
    border-bottom: 1px solid ${({ theme }) => theme.gray500};
  }
`;

const DeleteDeposito = () => {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setIsLoading(true);
        const data = await getDepositos();
        setClientes(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        notify("Error al obtener la lista de depósitos", "error", 3000);
      }
    };

    fetchClientes();
  }, []);

  const handleRowRemoved = async (e) => {
    try {
      await deleteDeposito(e.data.Id);
      notify("Depósito eliminado exitosamente", "success", 3000)
    } catch (err) {
      console.error('No se pudo eliminar el depósito:', err);
      notify("No se pudo eliminar el depósito", "error", 3000);
    }
  };

  return (
    <GridWrapper theme={theme}>

      <DataGrid
        dataSource={clientes}
        keyExpr="Id"
        showBorders={false}
        columnAutoWidth={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}
        wordWrapEnabled={true}
        height="auto"
        onRowRemoved={handleRowRemoved}
      >
        <SearchPanel visible={true} width={180} placeholder="Buscar..." />
        <FilterRow visible={true} />
        <Selection mode="multiple" showCheckBoxesMode="onClick" />
        <Export enabled={false} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} mode="select" />
        <Paging enabled={true} pageSize={10} />

        <Editing mode="row" allowDeleting={true} useIcons={true} />

        <Column dataField="Id" caption="ID" width={50} />
        <Column dataField="Monto" caption="Monto" />
        <Column dataField="CuentaId" caption="ID de la Cuenta" />
        <Column dataField="Cuenta.NumeroCuenta" caption="Número de Cuenta" />
        <Column dataField="Cuenta.TipoString" caption="Tipo de Cuenta" />
        <Column dataField="HechoPor" caption="Hecho Por" />
        <Column dataField="Descripcion" caption="Descripción" />
        <Column dataField="Fecha" caption="Fecha" />
      </DataGrid>
    </GridWrapper>
  );
};

export default DeleteDeposito;