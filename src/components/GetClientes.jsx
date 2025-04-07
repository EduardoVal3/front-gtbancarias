import React, { useEffect, useState } from 'react';
import { DataGrid, Column, Paging, SearchPanel } from 'devextreme-react/data-grid';
import { getClientes } from '../services/api';  // Importa la función de tu api.js

const GetClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setIsLoading(true);
        const data = await getClientes();
        setClientes(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div>
      {isLoading && <div>Cargando...</div>}
      {error && <div>Error: {error}</div>}

      <DataGrid
        dataSource={clientes}
        keyExpr="Id" // Campo único para identificar filas
        showBorders={true}
      >
        <Paging enabled={true} pageSize={10} />
        <SearchPanel visible={true} width={240} />

        {/* Columnas del grid */}
        <Column dataField="Id" caption="ID" width={70} />
        <Column dataField="Nombre" caption="Nombre" />
        <Column dataField="Apellido" caption="Apellido" />
        <Column dataField="Email" caption="Email" />
        <Column dataField="Telefono" caption="Teléfono" />
        <Column dataField="Direccion" caption="Dirección" />
      </DataGrid>
    </div>
  );
};

export default GetClientes;