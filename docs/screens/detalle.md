# Screen — Detalle del producto

- **Owner:** Lizeth C10
- **Status:** Planned
- **Route:** `/productos/:id`

---

## Purpose

Mostrar la información completa de un producto y permitir editarlo o eliminarlo.

---

## Entry and exit

- **Entry:** el usuario selecciona un producto desde `/productos`.
- **Exit:** el usuario vuelve a la lista, abre la pantalla de edición o elimina el producto y regresa a la lista.

---

## Content and layout

Mostrar los siguientes datos:

- Nombre
- Precio en pesos colombianos, formateado con `formatCOP`
- Categoría
- Cantidad disponible
- Etiqueta de stock:
  - **Agotado** si el stock es 0.
  - **Pocas unidades** si el stock es menor que 5.
  - **Disponible** en los demás casos.

Incluir los botones **Editar** y **Eliminar**.

---

## User interactions

- Al entrar, solicitar el producto a `GET /api/products/:id`.
- Al tocar **Editar**, navegar a `/productos/:id/editar`.
- Al tocar **Eliminar**, mostrar una confirmación simple en pantalla.
- Si el usuario confirma la eliminación, enviar `DELETE /api/products/:id`.
- Si la eliminación es exitosa, volver a `/productos`.
- Si el usuario cancela, permanecer en el detalle.

---

## States

- **Loading:** mostrar un indicador mientras se carga el producto.
- **Loaded:** mostrar todos los campos del producto.
- **Not found:** mostrar un mensaje si el producto no existe y permitir volver a la lista.
- **Error:** mostrar un mensaje si falla la solicitud y permitir reintentar.
- **Deleting:** indicar que la eliminación está en curso.
- **Delete error:** mostrar el error y conservar la opción de volver a intentar.

---

## Data

- **Source:** API Express.
- **Endpoint:** `GET /api/products/:id`.
- **Delete endpoint:** `DELETE /api/products/:id`.
- **Identifier:** el `id` del producto recibido en la ruta.

---

## Acceptance criteria

- Se muestran nombre, precio, categoría y stock.
- El precio se presenta con `formatCOP`.
- La etiqueta de stock corresponde a la cantidad disponible.
- Se puede navegar al formulario de edición.
- La eliminación solicita confirmación.
- Al eliminar con éxito, se vuelve a la lista.
- Se manejan los estados de carga, producto inexistente y error.