import React, { useState, useEffect } from 'react';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import { getTransferencias } from '../services/api';

const ListaTransferencias = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const data = await getTransferencias();
        setTransfers(data);
      } catch (error) {
        console.error('Error al obtener transferencias:', error);
      }
    };
    fetchTransfers();
  }, []);

  return (
    <DataGrid
      dataSource={transfers}
      keyExpr="Id"
      showBorders={true}
    >
      <Column dataField="Id" caption="ID" />
      <Column dataField="Monto" caption="Monto" />
      <Column dataField="CuentaOrigen.NumeroCuenta" caption="Cuenta Origen" />
      <Column dataField="CuentaDestino.NumeroCuenta" caption="Cuenta Destino" />
      <Column dataField="Fecha" caption="Fecha" />
      <Column dataField="Descripcion" caption="Descripción" />
    </DataGrid>
  );
};

export default ListaTransferencias;