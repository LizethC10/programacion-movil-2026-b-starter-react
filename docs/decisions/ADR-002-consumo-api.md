# ADR-002 — Consumo de la API

- **ID:** ADR-002
- **Date:** 2026-10-11
- **Status:** Accepted
- **Authors:** Lizeth C10

---

## Context

La aplicación Ionic React necesita consultar y modificar los productos de una API Express. La aplicación debe mostrar errores de manera comprensible cuando una solicitud falla. El starter incluye `API_URL`, `ApiError` y `getProducts` como ejemplos.

**Known constraints:**

- La API responde bajo `/api/products`.
- Los errores usan el formato `{ "error": "mensaje", "details": ["..."] }`.
- La app debe validar los datos del producto antes de enviarlos y también mostrar los errores reportados por el servidor.

---

## Decision

La capa `data/` centralizará las solicitudes HTTP con `fetch`. Usará `API_URL` para construir las direcciones y `ApiError` para representar las respuestas fallidas.

**We decided:** Implementar `getProducts`, `getProduct`, `createProduct`, `updateProduct` y `deleteProduct` en el cliente de datos.

**Justification:** Centralizar las solicitudes evita repetir la configuración HTTP en las pantallas y permite manejar los errores de forma consistente.

---

## Evaluated alternatives

- **Usar `fetch` en cada pantalla:** no seleccionado porque repetiría lógica y manejo de errores.
- **Centralizar las solicitudes en `data/`:** seleccionado porque separa el acceso a la API de la interfaz.
- **Usar una biblioteca HTTP adicional:** no seleccionada porque el starter ya utiliza `fetch` y no se necesita una dependencia adicional para este alcance.

---

## Consequences

- La capa de datos será el único lugar que conoce las rutas HTTP.
- Las funciones del cliente manejarán los métodos GET, POST, PUT y DELETE.
- La app podrá mostrar `error` y `details` cuando la API rechace una solicitud.
- `ApiError` permitirá distinguir errores de la API de otros errores de ejecución.
- La URL base dependerá de la configuración `API_URL`; debe configurarse para el entorno donde se ejecute la app.