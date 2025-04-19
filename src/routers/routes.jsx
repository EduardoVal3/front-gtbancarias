import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import { Clientes } from "../pages/Clientes"
import { Empleados } from "../pages/Empleados"
import { CuentasBancarias } from "../pages/CuentasBancarias"
import { Tarjetas } from "../pages/Tarjetas"
import { Prestamos } from "../pages/Prestamos"
import { Transacciones2 } from "../pages/Transacciones2"

export function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/clientes" element={<Clientes/>}/>
            <Route path="/empleados" element={<Empleados/>}/>
            <Route path="/cuentas" element={<CuentasBancarias/>}/>
            <Route path="/tarjetas" element={<Tarjetas/>}/>
            <Route path="/transacciones" element={<Transacciones2/>}/>
            <Route path="/prestamos" element={<Prestamos/>}/>
            {/* Añadir más rutas */}
        </Routes>
    )
}
