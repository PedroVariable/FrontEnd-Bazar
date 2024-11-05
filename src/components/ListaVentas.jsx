import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ListaVentas.css'; // Asegúrate de agregar estilos en el archivo CSS

const ListaVentas = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        axios.get('https://backend-bazar-0ytx.onrender.com/api/sales')
            .then(response => setSales(response.data))
            .catch(error => console.error(error));
    }, []);
    const calcularFechaEntrega = () => {
        const fechaActual = new Date();
        fechaActual.setDate(fechaActual.getDate() + 2); 
        return fechaActual.toLocaleDateString();
    };

    return (
        <div className="sales-container">
            <h2>Compras registradas</h2>
            <div className="sales-list">
                {sales.map((sale, index) => (
                    <div key={index} className="sales-card">
                        <img src={sale.thumbnail} alt={sale.title} className="sales-image" />
                        <div className="sales-info">
                            <h3 className="sales-title">{sale.title}</h3>
                            <p className="sales-price">Precio: ${sale.price.toFixed(2)}</p>
                            <p className="sales-date">
                                Fecha estimada de entrega: {calcularFechaEntrega()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaVentas;
