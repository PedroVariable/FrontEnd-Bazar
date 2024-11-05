// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SalesContext } from '../App';
import '../css/Navbar.css';

const Navbar = () => {
    const { sales } = useContext(SalesContext); 
    return (
        <header className="navbar">
            <Link to="/" className="logo">Tienda</Link>
            <nav>
                <Link to="/sales" className="cart-link">
                    🛒 Carrito <span className="cart-count">({sales.length})</span>
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
