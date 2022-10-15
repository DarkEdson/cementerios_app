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

  const getReportClient = async (usuarioID, lenguajeID, fechaIni, fechaFin,setValoresVenta) => {
    setisLoadingReports(true);
    apiReporteCliente(usuarioID, lenguajeID, fechaIni, fechaFin).then(res => {
      console.log('REPORTE DE CLIENTES COMPRAS', res);
      setReportsClients(res);
      setprodsClients(res.products)
      setValoresVenta({  subTotal: 0,
        comision: 0,
        total: res.total_sale.toFixed(2),})
      setisLoadingReports(false);
    });
  };

  const getReportSeller = async (usuarioID, lenguajeID, fechaIni, fechaFin,setValoresVenta) => {
    setisLoadingReports(true);
    apiReporteVendedor(usuarioID, lenguajeID, fechaIni, fechaFin).then(res => {
      console.log('REPORTE DE VENDEDORES VENTAS', res);
      setReportsSellers(res);
      setprodsSellers(res.products)
      setValoresVenta({  subTotal: 0,
        comision: res.total_comission.toFixed(2),
        total: res.total_sale.toFixed(2),})
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
        prodsClients,
        prodsSellers,
        setprodsSellers,
        setprodsClients
      }}>
      {children}
    </ReportsContext.Provider>
  );
};
