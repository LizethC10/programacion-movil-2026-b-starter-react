# Catálogo de productos · Ionic React

Parcial práctico del corte 2 · Programación Móvil · CORHUILA 2026-B.

La aplicación permite consultar y administrar un catálogo de productos. El proyecto incluye:

- **API Express** (`server/`): operaciones CRUD, validación, filtros y manejo uniforme de errores.
- **App Ionic React** (`src/`): lista con búsqueda y filtros, detalle y formulario para crear o editar productos.
- **Ejercicio Kotlin** (`kotlin/Product.kt`): modelo de producto, etiqueta de stock y cálculo de descuentos.
- **Documentación** (`docs/`): especificación de la funcionalidad, pantallas, API y decisiones de diseño.

El enunciado oficial es el PDF de la actividad en Moodle. Si hay alguna diferencia, prevalece el PDF.

## Requisitos y ejecución

Requisito: Node.js 22.12 o superior. Comprueba la versión con `node --version`.

```bash
npm install
npm run server
npm run dev
npm test
npm run lint
npm run build
```

Ejecuta `npm run server` y `npm run dev` en terminales distintas. La API estará disponible en `http://localhost:3000` y la aplicación en `http://localhost:5173`.

La aplicación lee la dirección de la API desde `VITE_API_URL`. Para cambiarla, copia `.env.example` como `.env` y modifica el valor. El archivo `.env` está ignorado por Git; no se debe versionar.

## Rutas de la aplicación

- `/productos`: lista, búsqueda y filtro por categoría.
- `/productos/nuevo`: formulario para crear un producto.
- `/productos/:id`: detalle y opción para eliminar.
- `/productos/:id/editar`: formulario para editar un producto.

## Flujo de entrega

1. Hacer un fork del repositorio y clonarlo.
2. Trabajar en la rama `feature/catalogo-productos`.
3. Seguir el orden de [TODO.md](./TODO.md) y realizar commits pequeños con formato Conventional Commits: `type(scope): resumen`.
4. Mantener la documentación antes del código; el primer commit de código debe ser posterior al commit de documentación.
5. Crear un Pull Request hacia `main` del propio fork, con una descripción del trabajo y el checklist de `docs/definition-of-done.md`.
6. Entregar el enlace del Pull Request en la actividad de Moodle, según las instrucciones del curso.

## Contrato de la API

El recurso `/api/products` usa productos con esta estructura:

```json
{
  "id": 1,
  "name": "Agua mineral 600 ml",
  "price": 1800,
  "category": "Bebidas",
  "stock": 120
}
```

Los datos iniciales están en `server/data/products.json` y se guardan en memoria; se restablecen al reiniciar el servidor.

| Método y ruta | Respuesta de éxito | Errores |
|---|---|---|
| `GET /api/products?search=&category=` | `200` con un arreglo | — |
| `GET /api/products/:id` | `200` con un producto | `400` si el id no es numérico; `404` si no existe |
| `POST /api/products` | `201` con el producto creado | `400` si los datos no son válidos |
| `PUT /api/products/:id` | `200` con el producto actualizado | `400` si el id o los datos no son válidos; `404` si no existe |
| `DELETE /api/products/:id` | `204` sin cuerpo | `400` si el id no es numérico; `404` si no existe |

La validación requiere un nombre de hasta 60 caracteres, un precio mayor que cero, una categoría de `Bebidas`, `Snacks`, `Aseo` o `Hogar`, y un stock entero mayor o igual que cero. Las respuestas de error usan el formato `{ "error": "mensaje", "details": ["..."] }`.

## Estructura del proyecto

```text
docs/
  api/                         documentación de API y entidad
  decisions/                   decisiones de arquitectura
  features/                    especificación del catálogo
  screens/                     especificaciones de las pantallas
  definition-of-done.md        checklist de finalización
kotlin/
  Product.kt                   ejercicio de Kotlin
server/
  app.js                       rutas, validación y errores de la API
  index.js                     inicio del servidor en el puerto 3000
  data/products.json           productos semilla
src/
  app/                         configuración de la aplicación y rutas
  features/products/
    data/                      cliente HTTP, configuración y errores de API
    domain/                    tipos, validación, filtros y formato de productos
    presentation/               lista, detalle, formulario y componentes
    __tests__/                  pruebas unitarias y de API
```

## State management decision

Each screen keeps its UI state with React `useState`; a global store is unnecessary for this feature. The product list loads data with `useEffect` and refreshes with `useIonViewWillEnter` when the user returns to it. Search and category filters are computed with the pure `filterProducts` function rather than stored as a second copy of the list. After a product is created, updated, or deleted, the app returns to the list, which reloads its data from the API.

## API error handling

The Express API uses `express.json()` to parse request bodies and CORS to allow requests from the Ionic app. Invalid input returns status `400`, missing products return `404`, and unexpected server errors are handled centrally with status `500`; API errors use the `{ "error": "message", "details": [] }` format. The client request helper converts network and HTTP failures into `ApiError` instances and keeps the server’s error details when available. The screens display the error message and provide a retry action when loading fails.

---

The documentation templates in `docs/` come from the Mobile Governance Framework. See `docs/LICENSE-mobile-governance-framework.txt` for the license.