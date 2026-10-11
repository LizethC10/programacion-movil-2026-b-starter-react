# API — Product entity

- **Owner:** Lizeth C10
- **Status:** Planned

---

## Purpose

Definir los campos y reglas del producto que usa la API y consume la aplicación Ionic.

## Entity

| Field | Type | Required | Rules |
|---|---|---|---|
| `id` | number | Sí | Identificador incremental asignado por la API. |
| `name` | string | Sí | Texto no vacío de máximo 60 caracteres. |
| `price` | number | Sí | Número mayor que 0. |
| `category` | string | Sí | Debe ser Bebidas, Snacks, Aseo u Hogar. |
| `stock` | number | Sí | Entero mayor o igual que 0. |

## Example

    {
      "id": 1,
      "name": "Producto de ejemplo",
      "price": 2500,
      "category": "Bebidas",
      "stock": 10
    }

## Validation

La API valida `name`, `price`, `category` y `stock` al crear o actualizar un producto. Si uno o más campos no cumplen las reglas, responde HTTP `400` con `error` y una lista `details` que contiene los mensajes de validación.

## Persistence

No aplica una base de datos. Los productos se guardan en memoria y los datos se reinician cuando se detiene el servidor. Los nuevos identificadores son incrementales.