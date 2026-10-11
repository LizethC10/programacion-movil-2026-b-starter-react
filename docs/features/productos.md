# Feature — Catálogo de productos

- **Owner:** Lizeth C10
- **Status:** In progress
- **Related stories:** HU-CAT-001, HU-CAT-002, HU-CAT-003

---

## Purpose

Permitir consultar y administrar un catálogo de productos desde una aplicación móvil. El usuario puede buscar, filtrar, ver detalles, crear, editar y eliminar productos.

---

## Screens

| Screen | Route | Purpose |
|---|---|---|
| Lista de productos | `/productos` | Mostrar, buscar y filtrar productos. |
| Detalle del producto | `/productos/:id` | Consultar los datos de un producto y acceder a editar o eliminar. |
| Formulario de producto | `/productos/nuevo` y `/productos/:id/editar` | Crear o editar un producto con validación. |

- Especificaciones: [Lista](../screens/lista.md), [Detalle](../screens/detalle.md), [Formulario](../screens/formulario.md).

---

## State

- **Pattern:** Estado local de React con `useState` y carga de datos con `useEffect`.
- **State object(s):** Cada página mantiene los datos que necesita, como productos, producto seleccionado, búsqueda, categoría, estado de carga y error.
- **Key transitions:** `loading → loaded`, `loading → empty`, `loading → error`; en la lista también puede mostrarse `no results` cuando los filtros no encuentran productos.

---

## Data

- **Use cases:** `ListProducts`, `GetProduct`, `CreateProduct`, `UpdateProduct`, `DeleteProduct`.
- **Repositories:** `ProductRepository`.
- **Remote sources / endpoints:** `GET /api/products` (con filtros `search` y `category`), `GET /api/products/:id`, `POST /api/products`, `PUT /api/products/:id` y `DELETE /api/products/:id`.
- **Local persistence:** No hay persistencia local. La API almacena los productos en memoria; los cambios se pierden al reiniciar el servidor.

---

## Edge cases & states

- [x] Loading
- [x] Empty: la API devuelve una lista sin productos.
- [x] Error / retry: mostrar el error y permitir reintentar la carga.
- [ ] Offline: no se ofrece funcionamiento sin conexión.
- [ ] Permission denied: no aplica a esta funcionalidad.
- [x] No results: hay productos, pero ninguno coincide con la búsqueda o categoría.

---

## Decisions

- [ADR-001: Estado de la aplicación](../decisions/ADR-001-estado.md)
- [ADR-002: Consumo de la API](../decisions/ADR-002-consumo-api.md)

---

## Tests

- **Unit:** `validateProduct`, `toProductView` y `filterProducts`.
- **Widget/UI:** lista de productos, estados de carga, vacío, sin resultados y error; detalle y formulario.
- **Integration/E2E:** consultar la lista desde la API y completar las operaciones de crear, editar y eliminar un producto.