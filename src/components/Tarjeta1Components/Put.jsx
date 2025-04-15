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
import { getTarjetasCredito, updateTarjetaCredito } from '../../services/tarjetaCreditoService';


const GridWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  border-radius: ${v.borderRadius};
  padding: ${v.lgSpacing};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow-x: auto;

  .dx-datagrid {
    border: none;
    font-size: ${({ theme }) => theme.fontsm};
    background-color: ${({ theme }) => theme.bgtotal};
    color: ${({ theme }) => theme.text};
  }

  .dx-datagrid-headers {
    background-color: ${({ theme }) => theme.bg3};
    color: ${({ theme }) => theme.text};
  }

  .dx-datagrid-rowsview .dx-row {
    background-color: ${({ theme }) => theme.bgtgderecha};
    transition: none !important;
    color: ${({ theme }) => theme.gray500};
  }

  .dx-datagrid-rowsview .dx-row:hover {
    background-color: ${({ theme }) => theme.bgtgderecha};
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

  .dx-datagrid .dx-datagrid-content .dx-datagrid-table .dx-row td {
    border-color: ${({ theme }) => theme.gray500};
  }

  .dx-datagrid .dx-row-lines > td {
    border-bottom: 1px solid ${({ theme }) => theme.gray500};
  }
`;

const PutTarjetaCredito = () => {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setIsLoading(true);
        const data = await getTarjetasCredito();
        setClientes(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const onRowUpdating = async (e) => {
    const id = e.oldData.Id;
    const updatedCliente = { ...e.oldData, ...e.newData };

    try {
      await updateTarjetaCredito(id, updatedCliente);
    } catch (err) {
      console.error('Error actualizando cliente:', err);
    }
  };

  return (
    <GridWrapper theme={theme}>
      {isLoading && <div>Cargando...</div>}
      {error && <div>Error: {error}</div>}

      <DataGrid
        dataSource={clientes}
        keyExpr="Id"
        showBorders={false}
        columnAutoWidth={true}
        rowAlternationEnabled={true}
        allowColumnResizing={true}
        wordWrapEnabled={true}
        height="auto"
        onRowUpdating={onRowUpdating}
      >
        <SearchPanel visible={true} width={180} placeholder="Buscar..." />
        <FilterRow visible={true} />
        <Selection mode="multiple" showCheckBoxesMode="onClick" />
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} mode="select" />
        <Paging enabled={true} pageSize={10} />

        <Editing
          mode="row"
          allowUpdating={true}
          useIcons={true}
        />

        <Column dataField="Id" caption="ID" width={50} />
        <Column dataField="NumeroTarjeta" caption="Número de Tarjeta" />
        <Column dataField="CVV" caption="CVV" />
        <Column dataField="FechaExpiracion" caption="Expira" />
        <Column dataField="LimiteCredito" caption="Crédito Límite" />
        <Column dataField="SaldoPendiente" caption="Saldo Pendiente" />
        <Column dataField="Cliente.Nombre" caption="Cliente" />
        <Column dataField="ClienteId" caption="Cliente ID" />
        
      </DataGrid>
    </GridWrapper>
  );
};

export default PutTarjetaCredito;