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

  const getReportClient = async (usuarioID, lenguajeID,setValoresVenta) => {
    setisLoadingReports(true);
    apiReporteCliente(usuarioID, lenguajeID).then(res => {
      console.log('REPORTE DE CLIENTES COMPRAS', res);
      console.log('PRODUCTOS VENTAS CLIENTES', res.products)
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
      let totalxcant = 0
      let totalsincant = 0
      if (res.products.length >=1)  {res.products.map(p=>{
        totalxcant = totalxcant + (p.value * p.quantity)
        totalsincant = totalsincant+p.value
      })}
      console.log('totalxCant',totalxcant)
      console.log('totalsinCant', totalsincant)
      let subtotalV = res.total_sale -res.total_comission
      setReportsSellers(res);
      setprodsSellers(res.products)
      setValoresVenta({  subTotal: subtotalV.toFixed(2),
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
