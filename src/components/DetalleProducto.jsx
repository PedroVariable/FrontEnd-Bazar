import { useEffect, useState, useContext  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/DetalleProducto.css';
import { SalesContext } from '../App';
const DetalleProducto = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addSale } = useContext(SalesContext);
    useEffect(() => {
        axios.get(`https://backend-bazar-0ytx.onrender.com/api/items/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error(error));
    }, [id]);
   
    const handlePurchase = () => {
        addSale(product);
        axios.post('https://backend-bazar-0ytx.onrender.com/api/addSale', product)
            .then(() => alert('Compra registrada!'))
            .catch(error => console.error(error));
    };

    return product ? (
        <div className="detalle-producto-container">
            <div className="product-main">
                <img src={product.images[0]} alt={product.title} className="product-image-large" />
                <div className="product-info">
                    <h1>{product.title}</h1>
                    <p className="product-brand">Marca: {product.brand}</p>
                    <p className="product-sku">SKU: {product.sku}</p>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">
                        Precio: ${product.price.toFixed(2)}
                        {product.discountPercentage > 0 && (
                            <span className="product-discount"> ({product.discountPercentage}% OFF)</span>
                        )}
                    </p>
                    <p className="product-rating">Calificación: ⭐ {product.rating}</p>
                    <button onClick={handlePurchase} className="purchase-button">Comprar</button>
                </div>
            </div>

            <div className="additional-info">
                <h3>Detalles del Producto</h3>
                <p><strong>Categoría:</strong> {product.category}</p>
                <p><strong>Dimensiones:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
                <p><strong>Peso:</strong> {product.weight} kg</p>
                <p><strong>Disponibilidad:</strong> {product.availabilityStatus}</p>
                <p><strong>Garantía:</strong> {product.warrantyInformation}</p>
                <p><strong>Envío:</strong> {product.shippingInformation}</p>
                <p><strong>Política de Devolución:</strong> {product.returnPolicy}</p>
                <img src={product.meta.qrCode} alt="QR Code" className="qr-code" />
            </div>

            <div className="reviews-section">
                <h3>Reseñas</h3>
                {product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <p><strong>{review.reviewerName}</strong> ({review.reviewerEmail.replace(/(.{2})(.*)(@.*)/, "$1***$3")})</p>
                            <p>Calificación: ⭐ {review.rating}</p>
                            <p>{review.comment}</p>
                            <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay reseñas para este producto.</p>
                )}
            </div>
        </div>
    ) : <p>Cargando...</p>;
};

export default DetalleProducto;
