# 🛒 Tienda de Electrodomésticos – Segundo Parcial  
## 🚀 Aplicación Web Modular con Vue.js y Bootstrap 5.3  

## 👥 Desarrolladores  
- **Juan Manuel Garrido Amaya** – 192544  
- **Jhon Fernando Sanchez Santiago** – 192551  

---

## 🧠 Competencia  
Desarrollar una aplicación web modularizada aplicando **componentización, ruteo y consumo de APIs externas** mediante **Vue.js 3** y **Bootstrap 5.3**, siguiendo buenas prácticas de organización de código, diseño responsivo y estructura modular.

---

## 🧭 Descripción General  
Este proyecto consiste en el desarrollo de una **aplicación web para la gestión de una Tienda de Electrodomésticos**.  
Permite visualizar, agregar, editar y eliminar productos electrónicos, simulando el funcionamiento de una tienda digital moderna.  

La aplicación implementa componentes reutilizables, navegación dinámica con `vue-router` y consumo de datos desde una **API externa** para mostrar información real de productos.  
El diseño se adapta a diferentes tamaños de pantalla utilizando **Bootstrap 5.3**.

---

## 🧩 Requerimientos Cumplidos  

### 1️⃣ Vista de Login (`LoginView`)  
- Validación de usuario mediante un archivo local `usuarios.json`.  
- Si las credenciales son correctas, redirige al **Dashboard principal**.  
- En caso contrario, muestra una alerta visual con **Bootstrap**.  
> ⚠️ *Esta validación es solo educativa y no representa autenticación real.*

---

### 2️⃣ Dashboard Principal (`DashboardView`)  
- Incluye **Navbar** y **Sidebar** como componentes reutilizables.  
- Permite navegar entre las diferentes secciones de la tienda sin recargar la página.  
- Utiliza `<router-view>` para renderizar dinámicamente las vistas hijas.

---

### 3️⃣ Gestión de Productos (`ProductView`)  
- Muestra un catálogo de electrodomésticos obtenidos desde una **API externa**.  
- Permite realizar acciones de:  
  - ✅ Listar productos  
  - ➕ Agregar nuevos productos  
  - ✏️ Editar productos existentes  
  - ❌ Eliminar productos  
- Los productos se presentan en tarjetas o tabla con estilo **Bootstrap**.

---

### 4️⃣ Componentes Reutilizables  
- **NavbarComponent:** Muestra el nombre de la tienda (“Tienda de Electrodomésticos”) y opciones de navegación.  
- **SidebarComponent:** Contiene las rutas del panel (Inicio, Productos, Clientes, etc.).  
- **FooterComponent:** Pie de página con los derechos reservados.  
- **ProductCardComponent:** Tarjeta individual con la imagen, nombre, precio y botón de acción de cada electrodoméstico.  

Los componentes se comunican mediante **props** y **eventos personalizados** (`emit`).

---

### 5️⃣ Ruteo y Navegación (`vue-router`)  
Rutas principales configuradas:  
- `/login` → LoginView  
- `/dashboard` → DashboardView  
- `/dashboard/productos` → ProductView  
- `/dashboard/clientes` (opcional)  

El Dashboard mantiene visible el **Sidebar** al navegar entre rutas hijas.

---

### 6️⃣ Estilos y Diseño  
- Basado en **Bootstrap 5.3**.  
- Paleta de colores inspirada en tecnología (azules, grises y blancos).  
- Diseño **responsivo** y adaptable a dispositivos móviles.  
- Uso coherente de tipografía, espaciado y tarjetas con sombras suaves.

---

## 🌐 Consumo de API Externa  
Ejemplo de implementación (`services/api.js`):

```javascript
export const getProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  return await response.json();
};
