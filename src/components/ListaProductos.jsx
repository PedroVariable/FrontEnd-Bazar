import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import '../css/ListaProducto.css';

const ListaProductos = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        axios.get(`https://backend-bazar-0ytx.onrender.com/api/items?q=${query}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, [query]);

    return (
        <div className="lp-container">
            <h2>Resultados de búsqueda: {products.length}</h2>
            <ul className="lp-card-list">
                {products.map(product => (
                    <li key={product.id} className="lp-card">
                        <Link to={`/item/${product.id}`} className="lp-card-link">
                            <img src={product.thumbnail} alt={product.title} className="lp-card-image" />
                            <div className="lp-card-content">
                                <h3 className="lp-card-title">{product.title}</h3>
                                <p className="lp-card-description">{product.description}</p>
                                <p className="lp-card-price">Precio: ${product.price}</p>
                                <p className="lp-card-rating">Calificación: ⭐{product.rating}</p>
                                <p className="lp-card-availability">{product.availabilityStatus}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaProductos;
