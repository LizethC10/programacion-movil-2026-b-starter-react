# Screen — Lista de productos

- **Owner:** Lizeth C10
- **Status:** Planned
- **Route:** `/productos`

---

## Purpose

Mostrar los productos disponibles y permitir buscarlos por nombre, filtrarlos por categoría y abrir su detalle.

---

## Entry and exit

- **Entry:** el usuario abre la opción Productos.
- **Exit:** el usuario abre un producto, inicia la creación de uno nuevo o vuelve a otra sección de la aplicación.

---

## Content and layout

- Título: **Productos**.
- Campo de búsqueda por nombre.
- Filtros de categoría: **Todas**, **Bebidas**, **Snacks**, **Aseo** y **Hogar**.
- Botón para crear un producto.
- Lista de productos usando el componente `ProductCard`.
- Cada tarjeta muestra nombre, precio, categoría, unidades disponibles y etiqueta de stock.

---

## User interactions

- Al entrar a la pantalla, solicitar los productos a `GET /api/products`.
- Al escribir en la búsqueda, filtrar por nombre sin distinguir mayúsculas y minúsculas.
- Al seleccionar una categoría, filtrar por la categoría exacta.
- Al seleccionar **Todas**, mostrar productos de todas las categorías.
- Al tocar una tarjeta, navegar a `/productos/:id`.
- Al tocar el botón de crear, navegar a `/productos/nuevo`.
- Al tocar **Reintentar**, volver a solicitar la lista a la API.

---

## States

- **Loading:** mostrar un indicador mientras se carga la lista.
- **Empty:** mostrar un mensaje si la API devuelve cero productos.
- **No results:** mostrar un mensaje si la búsqueda o categoría seleccionada no coincide con ningún producto.
- **Error:** mostrar un mensaje y el botón **Reintentar** si falla la solicitud.

---

## Data

- **Source:** API Express.
- **Endpoint:** `GET /api/products`.
- **Query parameters:** `search` para buscar por nombre y `category` para filtrar por categoría.
- **Categories:** Bebidas, Snacks, Aseo y Hogar.

---

## Acceptance criteria

- La lista se carga desde la API.
- La búsqueda y los filtros funcionan juntos.
- Se muestran los cinco botones de categoría requeridos.
- Se muestran los estados de carga, vacío, sin resultados y error.
- Cada producto se presenta mediante `ProductCard`.
- Desde una tarjeta se puede abrir el detalle del producto.
- La pantalla permite iniciar la creación de un producto.