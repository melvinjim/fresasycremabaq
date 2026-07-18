# 🍓 Fresas y Crema — Página web

Página web para tu local: menú, "lo más vendido", promociones, pedidos por
WhatsApp y un panel de administrador para editar todo.

---

## 📱 ¿Qué incluye?

- **Sitio para clientes** (adaptado a celular): portada, lo más vendido,
  promociones y menú completo por categorías.
- **Carrito + pedido por WhatsApp**: el cliente arma su pedido y te llega
  el mensaje listo a tu WhatsApp.
- **Panel de administrador** (link "Administración" abajo del sitio):
  editar precios, textos, categorías, promociones y subir imágenes.

Clave del panel por defecto: **`fresas2025`** (cámbiala en Ajustes → Seguridad).

---

## 🚀 Publicarla en internet (Vercel) — la forma fácil

No necesitas saber programar. Son 3 pasos:

### 1. Sube el proyecto a GitHub
- Crea una cuenta gratis en https://github.com
- Crea un repositorio nuevo (botón **New**).
- Sube **todos** los archivos de esta carpeta (puedes arrastrarlos en
  "uploading an existing file").

### 2. Conéctalo a Vercel
- Crea una cuenta gratis en https://vercel.com (entra con tu GitHub).
- Botón **Add New → Project** → elige el repositorio que subiste.
- Vercel detecta que es **Vite** solo. No cambies nada, dale **Deploy**.
- En 1 minuto tendrás un enlace tipo `fresas-y-crema.vercel.app` 🎉

Ese enlace es el que pones en tu Instagram.

> ¿Prefieres sin GitHub? Instala Node.js (https://nodejs.org), abre la
> carpeta en la terminal y ejecuta `npx vercel`. Sigue las preguntas.

---

## 💻 Probarla en tu computador (opcional)

1. Instala Node.js: https://nodejs.org
2. En la terminal, dentro de esta carpeta:
   ```
   npm install
   npm run dev
   ```
3. Abre el enlace que aparece (algo como http://localhost:5173).

---

## ⚠️ 2 cosas importantes

### 1. Cambia tu número de WhatsApp
Entra al panel (**Administración → Ajustes → WhatsApp**) y pon tu número
real con indicativo, solo números. Ejemplo: `573001234567`.
Sin esto, los pedidos no te llegan.

### 2. Para que los clientes vean tus cambios
Por defecto, los cambios que hagas en el panel se guardan **solo en tu
navegador**. Para que TODOS tus clientes vean los precios y productos que
editas, conecta una base de datos gratuita de Supabase.

Abre el archivo **`src/supabase.js`** — ahí están los pasos explicados
(crear cuenta, copiar 2 datos y pegarlos). Toma unos 5 minutos y es gratis.

---

## 🔒 Nota de seguridad

La clave del administrador protege el panel de forma básica, suficiente para
un menú. Si conectas Supabase, cualquiera con conocimientos técnicos podría
en teoría modificar los datos; para un negocio pequeño el riesgo es bajo y
siempre puedes restablecer tu menú desde **Ajustes → Exportar/Importar**.
Haz una copia (Exportar menú) de vez en cuando.
