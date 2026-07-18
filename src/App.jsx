import React, { useState, useEffect } from 'react';
import './App.css';

// ===== COMPONENTES =====

// Header con logo y carrito
function Header({ cartCount, onOpenCart }) {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <h1>🍓 Fresas y Crema</h1>
          <p className="navbar-subtitle">Lo más delicioso de Colombia</p>
        </div>
        <button className="cart-button" onClick={onOpenCart}>
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}

// Selector de sedes
function SedeSelector({ sedes, selectedSede, onSelectSede }) {
  return (
    <section className="sede-selector">
      <h2>📍 Selecciona una sede</h2>
      <div className="sede-grid">
        {sedes.map(sede => (
          <div
            key={sede.id}
            className={`sede-card ${selectedSede?.id === sede.id ? 'active' : ''}`}
            onClick={() => onSelectSede(sede)}
          >
            <h3>{sede.nombre}</h3>
            <p className="sede-city">{sede.ciudad}</p>
            <p className="sede-address">📍 {sede.direccion}</p>
            <p className="sede-phone">📞 {sede.whatsapp}</p>
            <p className="sede-hours">
              ⏰ {sede.horario.apertura} - {sede.horario.cierre}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Categorías de productos
function ProductCategories({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter">
      <button
        className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => onSelectCategory('all')}
      >
        Todos
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// Tarjeta de producto
function ProductCard({ producto, onAddToCart, disabled }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <span className="product-emoji">{producto.emoji || '🍓'}</span>
      </div>
      <div className="product-info">
        <h3>{producto.nombre}</h3>
        <p className="product-description">{producto.descripcion}</p>
        <div className="product-footer">
          <span className="product-price">${producto.precio.toLocaleString()}</span>
          <button
            className="add-btn"
            onClick={() => onAddToCart(producto)}
            disabled={disabled}
          >
            + Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

// Vista del carrito
function CartView({ cartItems, onRemoveItem, onCheckout, disabled }) {
  const total = cartItems.reduce((sum, item) => sum + item.precio, 0);
  const cantidades = {};
  cartItems.forEach(item => {
    cantidades[item.id] = (cantidades[item.id] || 0) + 1;
  });

  return (
    <div className="cart-view">
      <h2>Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
          <span className="empty-emoji">🛒</span>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {Object.entries(cantidades).map(([itemId, cantidad]) => {
              const item = cartItems.find(i => i.id === parseInt(itemId));
              return (
                <div key={itemId} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.nombre}</h4>
                    <p>Cantidad: {cantidad}</p>
                  </div>
                  <div className="cart-item-price">
                    <span>${(item.precio * cantidad).toLocaleString()}</span>
                    <button
                      className="remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-total">
            <span>Total:</span>
            <strong>${total.toLocaleString()}</strong>
          </div>
          <button
            className="checkout-btn"
            onClick={onCheckout}
            disabled={disabled}
          >
            {disabled ? 'Selecciona una sede primero' : 'Hacer Pedido por WhatsApp'}
          </button>
        </>
      )}
    </div>
  );
}

// Panel Administrativo
function AdminPanel() {
  const [activeTab, setActiveTab] = useState('productos');
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    descripcion: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Producto creado exitosamente');
        setFormData({ nombre: '', precio: '', categoria: '', descripcion: '' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el producto');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'productos' ? 'active' : ''}`}
          onClick={() => setActiveTab('productos')}
        >
          📦 Productos
        </button>
        <button
          className={`tab-btn ${activeTab === 'promociones' ? 'active' : ''}`}
          onClick={() => setActiveTab('promociones')}
        >
          🎯 Promociones
        </button>
        <button
          className={`tab-btn ${activeTab === 'sedes' ? 'active' : ''}`}
          onClick={() => setActiveTab('sedes')}
        >
          📍 Sedes
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'productos' && (
          <form className="admin-form" onSubmit={handleSubmit}>
            <h3>Añadir Nuevo Producto</h3>
            <div className="form-group">
              <label>Nombre del producto</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Categoría</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
              >
                <option value="">Selecciona una categoría</option>
                <option value="basicas">Básicas</option>
                <option value="esponjosos">Esponjosos</option>
                <option value="chocolate">Con Chocolate</option>
                <option value="fitness">Fit</option>
                <option value="combos">Combos</option>
              </select>
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="submit-btn">
              Guardar Producto
            </button>
          </form>
        )}

        {activeTab === 'promociones' && (
          <div className="admin-form">
            <h3>Crear Promoción</h3>
            <p>Funcionalidad de promociones próximamente...</p>
          </div>
        )}

        {activeTab === 'sedes' && (
          <div className="admin-form">
            <h3>Gestionar Sedes</h3>
            <p>Panel de gestión de sedes próximamente...</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== COMPONENTE PRINCIPAL =====

function App() {
  const [currentView, setCurrentView] = useState('tienda'); // 'tienda' o 'admin'
  const [sedes, setSedes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedSede, setSelectedSede] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        
        const [sedesRes, productosRes] = await Promise.all([
          fetch(`${apiUrl}/sedes`),
          fetch(`${apiUrl}/productos`)
        ]);

        const sedesData = await sedesRes.json();
        const productosData = await productosRes.json();

        setSedes(sedesData.data);
        setProductos(productosData.data);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory === 'all'
    ? productos
    : productos.filter(p => p.categoria === selectedCategory);

  const categories = [...new Set(productos.map(p => p.categoria))];

  // Funciones del carrito
  const handleAddToCart = (producto) => {
    setCartItems(prev => [...prev, { ...producto, cartId: Date.now() }]);
  };

  const handleRemoveItem = (productoId) => {
    setCartItems(prev => {
      const index = prev.findIndex(item => item.id === productoId);
      if (index > -1) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  };

  const handleCheckout = async () => {
    if (!selectedSede) {
      alert('Por favor selecciona una sede');
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/whatsapp/mensaje`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productos: cartItems,
          total: cartItems.reduce((sum, item) => sum + item.precio, 0),
          sedeId: selectedSede.id
        })
      });

      const data = await response.json();
      if (data.success) {
        window.open(data.data.whatsappUrl, '_blank');
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar el pedido');
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="app">
      <Header
        cartCount={cartItems.length}
        onOpenCart={() => setCurrentView('tienda')}
      />

      <nav className="main-nav">
        <button
          className={`nav-btn ${currentView === 'tienda' ? 'active' : ''}`}
          onClick={() => setCurrentView('tienda')}
        >
          🏪 Tienda
        </button>
        <button
          className={`nav-btn ${currentView === 'admin' ? 'active' : ''}`}
          onClick={() => setCurrentView('admin')}
        >
          ⚙️ Admin
        </button>
      </nav>

      <main className="main-content">
        {currentView === 'tienda' ? (
          <div className="tienda-view">
            <SedeSelector
              sedes={sedes}
              selectedSede={selectedSede}
              onSelectSede={setSelectedSede}
            />

            {selectedSede && (
              <section className="productos-section">
                <h2>Nuestros Productos</h2>
                <ProductCategories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                <div className="product-grid">
                  {filteredProducts.map(producto => (
                    <ProductCard
                      key={producto.id}
                      producto={producto}
                      onAddToCart={handleAddToCart}
                      disabled={!selectedSede}
                    />
                  ))}
                </div>
              </section>
            )}

            <aside className="cart-sidebar">
              <CartView
                cartItems={cartItems}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
                disabled={!selectedSede}
              />
            </aside>
          </div>
        ) : (
          <AdminPanel />
        )}
      </main>
    </div>
  );
}

export default App;
