import { useState, useEffect } from 'react'
import './App.css'

function Header() {
  return (
    <header className="navbar">
      <h1>🍓 Fresas y Crema</h1>
    </header>
  )
}

function App() {
  const [sedes] = useState([
    { id: 1, nombre: 'Barranquilla - Parque Alegra', ciudad: 'Barranquilla', whatsapp: '3014012572' },
    { id: 2, nombre: 'Barranquilla - Miramar', ciudad: 'Barranquilla', whatsapp: '3014012572' },
    { id: 3, nombre: 'Bucaramanga', ciudad: 'Bucaramanga', whatsapp: '3205551234' },
  ])

  const [productos] = useState([
    { id: 1, nombre: 'Fresas con Crema', precio: 15000, emoji: '🍓' },
    { id: 2, nombre: 'Fluffies', precio: 18000, emoji: '☁️' },
    { id: 3, nombre: 'Merengón', precio: 16000, emoji: '🤍' },
  ])

  const [selectedSede, setSelectedSede] = useState(null)
  const [cart, setCart] = useState([])

  const handleAddToCart = (producto) => {
    setCart([...cart, producto])
  }

  return (
    <div className="app">
      <Header />
      
      <main className="container">
        <section className="sedes-section">
          <h2>Selecciona una sede</h2>
          <div className="sedes-grid">
            {sedes.map(sede => (
              <div 
                key={sede.id} 
                className={`sede-card ${selectedSede?.id === sede.id ? 'active' : ''}`}
                onClick={() => setSelectedSede(sede)}
              >
                <h3>{sede.nombre}</h3>
                <p>{sede.ciudad}</p>
                <p>📞 {sede.whatsapp}</p>
              </div>
            ))}
          </div>
        </section>

        {selectedSede && (
          <section className="productos-section">
            <h2>Productos</h2>
            <div className="product-grid">
              {productos.map(producto => (
                <div key={producto.id} className="product-card">
                  <div className="product-emoji">{producto.emoji}</div>
                  <h3>{producto.nombre}</h3>
                  <p className="price">${producto.precio.toLocaleString()}</p>
                  <button 
                    className="add-btn"
                    onClick={() => handleAddToCart(producto)}
                  >
                    Añadir
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {cart.length > 0 && (
          <section className="cart-section">
            <h2>Carrito ({cart.length})</h2>
            <div className="cart-total">
              Total: ${cart.reduce((sum, item) => sum + item.precio, 0).toLocaleString()}
            </div>
            <button className="checkout-btn">
              Hacer Pedido por WhatsApp
            </button>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
