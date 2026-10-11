# API — Products endpoints

- **Owner:** Lizeth C10
- **Status:** Planned
- **Base path:** `/api/products`

---

## Product representation

    {
      "id": 1,
      "name": "Producto de ejemplo",
      "price": 2500,
      "category": "Bebidas",
      "stock": 10
    }

Los productos se almacenan en memoria. Los nuevos `id` son incrementales.

## Validation

Para `POST` y `PUT`:

- `name` es obligatorio, debe ser texto no vacío y tener máximo 60 caracteres.
- `price` debe ser un número mayor que 0.
- `category` debe ser Bebidas, Snacks, Aseo u Hogar.
- `stock` debe ser un entero mayor o igual que 0.

Los errores de validación responden con HTTP `400` y este formato:

    {
      "error": "Datos inválidos",
      "details": ["mensaje por cada problema"]
    }

## Endpoints

### GET `/api/products`

Devuelve HTTP `200` y un arreglo de productos.

Query parameters opcionales:

- `search`: busca productos cuyo nombre contenga el texto, sin distinguir mayúsculas y minúsculas.
- `category`: filtra por coincidencia exacta de categoría.

### GET `/api/products/:id`

- `200`: devuelve el producto solicitado.
- `400`: el `id` no es numérico.
- `404`: no existe un producto con ese `id`.

### POST `/api/products`

Recibe `name`, `price`, `category` y `stock`.

- `201`: devuelve el producto creado, incluyendo su nuevo `id`.
- `400`: los datos no cumplen las reglas de validación.

### PUT `/api/products/:id`

Recibe `name`, `price`, `category` y `stock` para actualizar el producto.

- `200`: devuelve el producto actualizado.
- `400`: el `id` no es numérico o los datos no son válidos.
- `404`: no existe un producto con ese `id`.

### DELETE `/api/products/:id`

- `204`: producto eliminado; la respuesta no tiene cuerpo.
- `400`: el `id` no es numérico.
- `404`: no existe un producto con ese `id`.

## Error format

Las respuestas de error usan un objeto con `error` y `details`. `details` contiene un mensaje por cada problema de validación.

## Persistence

El almacenamiento es en memoria y se reinicia al detener el servidor.