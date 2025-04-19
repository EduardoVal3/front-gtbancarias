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
} from 'devextreme-react/data-grid';

import styled, { useTheme } from 'styled-components';
import { v } from '../../styles/Variables';
import { getTarjetasDebito } from '../../services/tarjetaDebitoService';
import notify from 'devextreme/ui/notify';



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

const GetTarjetasDebito = () => {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setIsLoading(true);
        const data = await getTarjetasDebito();
        setClientes(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        notify("No se pudo obtener la lista de tarjetas de débito", "error", 3000)
      }
    };

    fetchClientes();
  }, []);

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
      >
        <SearchPanel visible={true} width={180} placeholder="Buscar..." />
        <FilterRow visible={true} />
        <Selection mode="multiple" showCheckBoxesMode="onClick" />
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} mode="select" />
        <Paging enabled={true} pageSize={10} />

        <Column dataField="Id" caption="ID" width={50} />
        <Column dataField="NumeroTarjeta" caption="Número de Tarjeta" />
        <Column dataField="CVV" caption="CVV" />
        <Column dataField="FechaExpiracion" caption="Expira" />
        <Column dataField="SaldoDisponible" caption="Saldo Disponible" />
        <Column dataField="Cliente.Nombre" caption="Cliente" />
        <Column dataField="ClienteId" caption="Cliente ID" />
      </DataGrid>
    </GridWrapper>
  );
};

export default GetTarjetasDebito;