import React, {createContext, useEffect, useState} from 'react';
//Apis
import {apiReporteCliente, apiReporteVendedor} from '@Apis/ReportsApi';

export const ReportsContext = createContext();

export const ReportsProvider = ({children}) => {
  const [ReportsClients, setReportsClients] = useState({});
  const [prodsClients, setprodsClients] = useState([]);
  const [ReportsSellers, setReportsSellers] = useState({});
  const [prodsSellers, setprodsSellers] = useState([]);
  const [isLoadingReports, setisLoadingReports] = useState(false);

  const getReportClient = async (usuarioID, lenguajeID, fechaIni, fechaFin) => {
    setisLoadingReports(true);
    apiReporteCliente(usuarioID, lenguajeID, fechaIni, fechaFin).then(res => {
      console.log('REPORTE DE CLIENTES COMPRAS', res);
      setReportsClients(res);
      setisLoadingReports(false);
    });
  };

  const getReportSeller = async (usuarioID, lenguajeID, fechaIni, fechaFin) => {
    setisLoadingReports(true);
    apiReporteVendedor(usuarioID, lenguajeID, fechaIni, fechaFin).then(res => {
      console.log('REPORTE DE VENDEDORES VENTAS', res);
      setReportsSellers(res);
      setisLoadingReports(false);
    });
  };

  useEffect(() => {}, []);

  return (
    <ReportsContext.Provider
      value={{
        ReportsSellers,
        isLoadingReports,
        ReportsClients,
        getReportClient,
        getReportSeller,
      }}>
      {children}
    </ReportsContext.Provider>
  );
};
