// App.js
import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
//import HomePage from './components/HomePage'; // Página principal después de autenticación
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import AddProduct from './components/AddProduct';
import './styles.css';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Control de autenticación
  const [view, setView] = useState('login');  // Control de vistas (login, register)
  const [currentView, setCurrentView] = useState('home'); // Control de vista dentro de la tienda
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  // Llamada para cargar los productos al iniciar
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
    setProducts([...products, newProduct]); // Agregar producto nuevo
  };

  const handleLogin = () => {
    setIsAuthenticated(true);  // Cambiar estado de autenticado
  };

  const handleRegister = () => {
    setIsAuthenticated(true);  // Cambiar estado de autenticado después de registro
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Manejar el logout
    setView('login');  // Volver a la vista de login
  };

  return (
    <div className="App">
      {/* Si el usuario no está autenticado, mostrar login o registro */}
      {!isAuthenticated ? (
        <>
          {view === 'login' ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Register onRegister={handleRegister} />
          )}
          <button onClick={() => setView(view === 'login' ? 'register' : 'login')}>
            {view === 'login' ? 'Ir a Registrarse' : 'Ir a Iniciar Sesión'}
          </button>
        </>
      ) : (
        <div>
          <header>
            <h1>Tienda Virtual</h1>
            <div className="cart-info">
              <span>Carrito ({cart.length} items)</span>
              <span>Total: ${totalAmount.toFixed(2)}</span>
              <button onClick={handleLogout}>Cerrar Sesión</button>
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
    </div>
  );
};

export default App;


