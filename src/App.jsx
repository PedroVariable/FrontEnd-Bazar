// src/App.js
import { createContext, useState, useEffect  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Busqueda from './components/Busqueda';
import ListaProductos from './components/ListaProductos';
import DetalleProducto from './components/DetalleProducto';
import ListaVentas from './components/ListaVentas';
import Navbar from './components/Navbar'; // Importa el Navbar

// Crear el contexto para ventas
// Crear el contexto para ventas
export const SalesContext = createContext();

function App() {
    const [sales, setSales] = useState([]);

    // Función para agregar productos a las ventas
    const addSale = (product) => {
        setSales(prevSales => [...prevSales, product]);
    };

    // useEffect para verificar los cambios en sales
    useEffect(() => {
        console.log("Productos en el carrito (actualizados):", sales);
    }, [sales]);

    return (
        <SalesContext.Provider value={{ sales, addSale }}>
            <Router>
                <Navbar /> {/* Coloca el Navbar aquí para que aparezca en todas las rutas */}
                <Routes>
                    <Route path="/" element={<Busqueda />} />
                    <Route path="/items" element={<ListaProductos />} />
                    <Route path="/item/:id" element={<DetalleProducto />} />
                    <Route path="/sales" element={<ListaVentas />} />
                </Routes>
            </Router>
        </SalesContext.Provider>
    );
}

export default App;
