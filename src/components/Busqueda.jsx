import { useState, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import '../css/Busqueda.css'

const Busqueda = () => {
    const [query, setQuery] = useState('');
    const [topDiscounts, setTopDiscounts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/items?q=${query}`);
    };

    useEffect(() => {
        axios.get('https://backend-bazar-0ytx.onrender.com/api/items')
            .then(response => {
                console.log("Respuesta de la API:", response.data);
                const sortedProducts = response.data.sort((a, b) => b.discountPercentage - a.discountPercentage);
                setTopDiscounts(sortedProducts.slice(0, 5)); 
                setAllProducts(response.data); 
            })
            .catch(error => console.error(error));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <div className="busqueda-container">
            <div className="search-bar">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar producto"
                    className="busqueda-input"
                />
                <button onClick={handleSearch} className="busqueda-button">🔍</button>
            </div>

            <div className="carousel-container">
                <h3>Productos con Mayor Descuento</h3>
                <Slider {...settings}>
                    {topDiscounts.map(product => (
                        
                        <div key={product.id} className="carousel-item"
                        onClick={() => navigate(`/item/${product.id}`)}>
                            
                            <img src={product.thumbnail} alt={product.title} className="carousel-image" />
                            <div className="carousel-info">
                                <h4>{product.title}</h4>
                                <p>Descuento: {product.discountPercentage}%</p>
                                <p>Precio: ${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="products-grid">
                <h3>Todos los Productos</h3>
                <div className="grid-container">
                    {allProducts.map(product => (
                        <div key={product.id} className="product-card"
                        onClick={() => navigate(`/item/${product.id}`)}>
                        <span className="discount-tag">{product.discountPercentage}% OFF</span>
                        <img src={product.thumbnail} alt={product.title} />
                        <div className="product-info">
                            <h4>{product.title}</h4>
                            <p>Precio: ${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Busqueda;