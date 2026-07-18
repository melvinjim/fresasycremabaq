const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ================== DATOS SIMULADOS ==================
// En producción, esto vendrá de una base de datos

const sedes = [
  {
    id: 1,
    nombre: 'Barranquilla - Parque Alegra',
    ciudad: 'Barranquilla',
    direccion: 'CC Parque Alegra, 3er piso, Plazoleta de Comidas',
    whatsapp: '3014012572',
    horario: { apertura: '11:30', cierre: '21:00' },
    lat: 10.9881,
    lng: -74.7855
  },
  {
    id: 2,
    nombre: 'Barranquilla - Miramar',
    ciudad: 'Barranquilla',
    direccion: 'CC Miramar Plaza, 2do piso',
    whatsapp: '3014012572',
    horario: { apertura: '11:30', cierre: '21:00' },
    lat: 10.9885,
    lng: -74.7865
  },
  {
    id: 3,
    nombre: 'Bucaramanga',
    ciudad: 'Bucaramanga',
    direccion: 'Centro Comercial Bucaramanga',
    whatsapp: '3205551234',
    horario: { apertura: '12:00', cierre: '20:00' },
    lat: 7.1325,
    lng: -73.1227
  },
  {
    id: 4,
    nombre: 'Puerto Colombia',
    ciudad: 'Puerto Colombia',
    direccion: 'Calle Principal s/n',
    whatsapp: '3205551235',
    horario: { apertura: '11:00', cierre: '21:00' },
    lat: 10.9882,
    lng: -74.9547
  },
  {
    id: 5,
    nombre: 'Yopal',
    ciudad: 'Yopal',
    direccion: 'Centro Comercial',
    whatsapp: '3205551236',
    horario: { apertura: '12:00', cierre: '21:00' },
    lat: 5.3632,
    lng: -71.5898
  }
];

const productos = [
  {
    id: 1,
    nombre: 'Fresas con Crema Tradicional',
    categoria: 'basicas',
    descripcion: 'Deliciosas fresas frescas con crema suave',
    precio: 15000,
    imagen: 'fresas-basicas.jpg',
    activo: true
  },
  {
    id: 2,
    nombre: 'Fluffies de Fresas',
    categoria: 'esponjosos',
    descripcion: 'Esponjosos fluffies con fresas y crema',
    precio: 18000,
    imagen: 'fluffies.jpg',
    activo: true
  },
  {
    id: 3,
    nombre: 'Merengón Tradicional',
    categoria: 'merengueles',
    descripcion: 'Merengón de fresas con crema inglesa',
    precio: 16000,
    imagen: 'merengon.jpg',
    activo: true
  },
  {
    id: 4,
    nombre: 'Fresas con Chocolate',
    categoria: 'chocolate',
    descripcion: 'Fresas con crema y chocolate derretido',
    precio: 17000,
    imagen: 'fresas-chocolate.jpg',
    activo: true
  },
  {
    id: 5,
    nombre: 'Parfait Yogurt Griego',
    categoria: 'fitness',
    descripcion: 'Yogurt griego, granola y fresas frescas',
    precio: 17500,
    imagen: 'parfait.jpg',
    activo: true
  }
];

const promociones = [
  {
    id: 1,
    titulo: 'Combo Parejas',
    descripcion: '2 Fresas con Crema + 2 toppings de tu elección',
    precio: 28000,
    productosIncluidos: [1, 1],
    activa: true,
    fechaInicio: '2026-01-01',
    fechaFin: '2026-12-31'
  },
  {
    id: 2,
    titulo: 'Promo Familia',
    descripcion: '3 Fluffies + 2 Merengones',
    precio: 45000,
    productosIncluidos: [2, 2, 2, 3, 3],
    activa: true,
    fechaInicio: '2026-01-01',
    fechaFin: '2026-12-31'
  }
];

// ================== RUTAS PÚBLICAS ==================

// Obtener todas las sedes
app.get('/api/sedes', (req, res) => {
  res.json({
    success: true,
    data: sedes
  });
});

// Obtener una sede específica
app.get('/api/sedes/:id', (req, res) => {
  const sede = sedes.find(s => s.id === parseInt(req.params.id));
  if (!sede) {
    return res.status(404).json({ success: false, message: 'Sede no encontrada' });
  }
  res.json({ success: true, data: sede });
});

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
  const categoria = req.query.categoria;
  let resultado = productos;
  
  if (categoria) {
    resultado = productos.filter(p => p.categoria === categoria);
  }
  
  res.json({
    success: true,
    data: resultado
  });
});

// Obtener todas las promociones activas
app.get('/api/promociones', (req, res) => {
  const hoy = new Date().toISOString().split('T')[0];
  const activas = promociones.filter(p => 
    p.activa && 
    p.fechaInicio <= hoy && 
    p.fechaFin >= hoy
  );
  
  res.json({
    success: true,
    data: activas
  });
});

// Generar mensaje para WhatsApp
app.post('/api/whatsapp/mensaje', (req, res) => {
  const { productos, total, sedeId } = req.body;
  
  if (!sedeId || !productos || !total) {
    return res.status(400).json({ 
      success: false, 
      message: 'Faltan datos requeridos' 
    });
  }
  
  const sede = sedes.find(s => s.id === parseInt(sedeId));
  if (!sede) {
    return res.status(404).json({ 
      success: false, 
      message: 'Sede no encontrada' 
    });
  }
  
  let mensaje = 'Hola! Quisiera hacer un pedido:\n\n';
  productos.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad || 1}: $${(p.precio * (p.cantidad || 1)).toLocaleString()}\n`;
  });
  mensaje += `\n*Total: $${total.toLocaleString()}*\n`;
  mensaje += `\nSede: ${sede.nombre}`;
  
  const whatsappUrl = `https://wa.me/57${sede.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(mensaje)}`;
  
  res.json({
    success: true,
    data: {
      mensaje,
      whatsappUrl,
      numeroWhatsapp: sede.whatsapp
    }
  });
});

// ================== RUTAS DE ADMIN ==================

// POST: Crear nuevo producto
app.post('/api/admin/productos', (req, res) => {
  const { nombre, categoria, descripcion, precio, imagen } = req.body;
  
  if (!nombre || !precio) {
    return res.status(400).json({ 
      success: false, 
      message: 'Nombre y precio son requeridos' 
    });
  }
  
  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    categoria: categoria || 'otros',
    descripcion: descripcion || '',
    precio: parseFloat(precio),
    imagen: imagen || 'default.jpg',
    activo: true
  };
  
  productos.push(nuevoProducto);
  
  res.status(201).json({
    success: true,
    message: 'Producto creado exitosamente',
    data: nuevoProducto
  });
});

// PUT: Actualizar producto
app.put('/api/admin/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  
  if (!producto) {
    return res.status(404).json({ 
      success: false, 
      message: 'Producto no encontrado' 
    });
  }
  
  Object.assign(producto, req.body);
  
  res.json({
    success: true,
    message: 'Producto actualizado exitosamente',
    data: producto
  });
});

// DELETE: Eliminar producto
app.delete('/api/admin/productos/:id', (req, res) => {
  const index = productos.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ 
      success: false, 
      message: 'Producto no encontrado' 
    });
  }
  
  const eliminado = productos.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Producto eliminado exitosamente',
    data: eliminado[0]
  });
});

// POST: Crear promoción
app.post('/api/admin/promociones', (req, res) => {
  const { titulo, descripcion, precio, productosIncluidos, fechaInicio, fechaFin } = req.body;
  
  if (!titulo || !precio) {
    return res.status(400).json({ 
      success: false, 
      message: 'Título y precio son requeridos' 
    });
  }
  
  const nuevaPromo = {
    id: promociones.length + 1,
    titulo,
    descripcion: descripcion || '',
    precio: parseFloat(precio),
    productosIncluidos: productosIncluidos || [],
    activa: true,
    fechaInicio: fechaInicio || new Date().toISOString().split('T')[0],
    fechaFin: fechaFin || '2099-12-31'
  };
  
  promociones.push(nuevaPromo);
  
  res.status(201).json({
    success: true,
    message: 'Promoción creada exitosamente',
    data: nuevaPromo
  });
});

// PUT: Actualizar sede
app.put('/api/admin/sedes/:id', (req, res) => {
  const sede = sedes.find(s => s.id === parseInt(req.params.id));
  
  if (!sede) {
    return res.status(404).json({ 
      success: false, 
      message: 'Sede no encontrada' 
    });
  }
  
  Object.assign(sede, req.body);
  
  res.json({
    success: true,
    message: 'Sede actualizada exitosamente',
    data: sede
  });
});

// POST: Crear nueva sede
app.post('/api/admin/sedes', (req, res) => {
  const { nombre, ciudad, direccion, whatsapp, horario } = req.body;
  
  if (!nombre || !ciudad || !whatsapp) {
    return res.status(400).json({ 
      success: false, 
      message: 'Nombre, ciudad y WhatsApp son requeridos' 
    });
  }
  
  const nuevaSede = {
    id: Math.max(...sedes.map(s => s.id)) + 1,
    nombre,
    ciudad,
    direccion: direccion || '',
    whatsapp,
    horario: horario || { apertura: '11:00', cierre: '21:00' },
    lat: 0,
    lng: 0
  };
  
  sedes.push(nuevaSede);
  
  res.status(201).json({
    success: true,
    message: 'Sede creada exitosamente',
    data: nuevaSede
  });
});

// ================== GESTIÓN DE ERRORES ==================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ================== INICIAR SERVIDOR ==================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 Endpoints disponibles:`);
  console.log(`   GET /api/sedes`);
  console.log(`   GET /api/productos`);
  console.log(`   GET /api/promociones`);
  console.log(`   POST /api/whatsapp/mensaje`);
  console.log(`   POST/PUT/DELETE /api/admin/... (admin routes)`);
});

module.exports = app;
