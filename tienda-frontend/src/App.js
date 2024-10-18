// src/App.js
import React, { useEffect, useState } from 'react';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import Register from './components/Register';
import Footer from './Footer';
import logo from './images/vt.png';
import './styles.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('login');  
  const [currentView, setCurrentView] = useState('home');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const totalAmount = cart.reduce((total, product) => total + product.price, 0);

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('login');
  };

  const handleSwitchToRegister = () => {
    setView('register');
  };

  const handleSwitchToLogin = () => {
    setView('login');
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <>
          {view === 'login' ? (
            <Login onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />
          ) : (
            <Register onRegister={handleRegister} onSwitchToLogin={handleSwitchToLogin} />
          )}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button onClick={() => setView(view === 'login' ? 'register' : 'login')}>
            {view === 'login' ? 'Ir a Registrarse' : 'Ir a Iniciar Sesión'}
          </button>
        </>
      ) : (
        <div>
          <header>
            <h1>Bienvenido a Nuestra Tienda</h1>
            <img src={logo} alt="Logo" className="logo" />
            <div className="cart-info">
              <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <nav>
              <button onClick={() => setCurrentView('home')}>Pantalla Principal</button>
              <button onClick={() => setCurrentView('addProduct')}>Agregar Productos</button>
              <button onClick={() => setCurrentView('cart')}>Carrito</button>
            </nav>
          </header>

          {/* Pantalla principal para ver lista de productos */}
          {currentView === 'home' && (
            <section className="product-list-section">
              <h2>Lista de Productos</h2>
              <ProductList products={products} onProductSelect={handleProductSelect} addToCart={addToCart} />
            </section>
          )}

          {/* Vista de agregar productos */}
          {currentView === 'addProduct' && (
            <section className="add-product-section">
              <h2>Agregar Producto</h2>
              <AddProduct onProductAdded={handleProductAdded} />
            </section>
          )}

          {/* Vista del carrito */}
          {currentView === 'cart' && (
            <section className="cart-section">
              <h2>Carrito</h2>
              <Cart cart={cart} removeFromCart={removeFromCart} />
            </section>
          )}

          {/* Detalles del producto seleccionado */}
          {selectedProduct && (
            <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} addToCart={addToCart} />
          )}
        </div>
      )}
      <Footer /> 
    </div>
  );
};

export default App;





