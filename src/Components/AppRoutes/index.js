import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Orders from "../../Pages/Orders";
import Dashboard from "../../Pages/Chart";
import { Chart } from "chart.js";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/chart" element={<Dashboard />}></Route>
    </Routes>
  );
}
export default AppRoutes;
