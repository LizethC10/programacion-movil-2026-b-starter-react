# Screen — Formulario de producto

- **Owner:** Lizeth C10
- **Status:** Planned
- **Routes:** `/productos/nuevo` y `/productos/:id/editar`

---

## Purpose

Permitir crear un producto nuevo o actualizar uno existente, validando sus datos antes de enviarlos a la API.

---

## Entry and exit

- **Create entry:** el usuario toca el botón para crear un producto desde `/productos`.
- **Edit entry:** el usuario toca **Editar** desde el detalle de un producto.
- **Success exit:** después de guardar, abrir el detalle del producto creado o actualizado.
- **Cancel exit:** volver a la pantalla anterior sin guardar los cambios.

---

## Fields

- **Name:** texto obligatorio, no vacío y de máximo 60 caracteres.
- **Price:** número mayor que 0.
- **Category:** obligatoria; seleccionar entre Bebidas, Snacks, Aseo y Hogar.
- **Stock:** número entero mayor o igual que 0.

---

## User interactions

- En modo creación, mostrar un formulario vacío.
- En modo edición, cargar los datos actuales del producto.
- Al cambiar un campo, validar los datos con `validateProduct`.
- Mostrar los mensajes de validación junto al campo correspondiente.
- Al guardar, enviar los datos a la API.
- Si la API rechaza los datos, mostrar los mensajes incluidos en `details`.
- Permitir cancelar y volver sin guardar.

---

## States

- **Loading:** en edición, indicar que se están cargando los datos del producto.
- **Ready:** mostrar el formulario listo para ingresar o modificar datos.
- **Validation error:** mostrar los errores de validación en línea.
- **Saving:** indicar que los datos se están enviando.
- **Error:** mostrar el mensaje recibido de la API si falla el guardado.
- **Success:** informar que se guardó correctamente y abrir el detalle.

---

## Data

- **Validation:** función `validateProduct`.
- **Create endpoint:** `POST /api/products`.
- **Update endpoint:** `PUT /api/products/:id`.
- **Request fields:** `name`, `price`, `category` y `stock`.

---

## Acceptance criteria

- El mismo formulario permite crear y editar.
- Los campos cumplen las reglas de validación requeridas.
- Los errores locales se muestran junto a los campos.
- Los errores `details` del servidor se muestran al usuario.
- Al guardar correctamente, se abre el detalle del producto.
- El usuario puede cancelar y volver sin guardar.