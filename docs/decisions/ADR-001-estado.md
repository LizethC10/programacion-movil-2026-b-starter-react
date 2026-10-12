# ADR-001 — Estado de la aplicación

- **ID:** ADR-001
- **Date:** 2026-10-11
- **Status:** Accepted
- **Authors:** Lizeth C10

---

## Context

Las pantallas del catálogo necesitan guardar datos de productos y mostrar estados de carga, vacío, error y resultados. El starter usa Ionic React y el parcial indica manejar el estado con `useState` y `useEffect`.

**Known constraints:**

- El alcance corresponde a un catálogo pequeño.
- La aplicación debe consumir una API Express.
- Se debe trabajar con el starter Ionic React.

---

## Decision

Usaremos estado local de React con `useState` para los datos de cada pantalla y `useEffect` para cargar datos cuando corresponda.

**We decided:** Cada página manejará el estado que necesita para consultar o modificar productos.

**Justification:** Este patrón está incluido en React y es suficiente para las pantallas del catálogo. Permite mostrar claramente los estados de carga, vacío y error sin agregar dependencias.

---

## Evaluated alternatives

- **Estado local con `useState` y `useEffect`:** seleccionado porque satisface el alcance y el patrón pedido en el parcial.
- **Librería global de estado:** no seleccionada porque el catálogo no requiere compartir estado complejo entre muchas funciones.
- **Manejo manual sin estado de React:** no seleccionado porque dificultaría actualizar la interfaz cuando cambian los datos.

---

## Consequences

- Cada página mantiene el estado que necesita.
- La lista puede distinguir carga, lista vacía, ausencia de resultados y error.
- El formulario puede mostrar errores de validación y mensajes de la API.
- No se agrega una dependencia para administrar estado.
- Si en el futuro varias funciones necesitan compartir mucho estado, esta decisión deberá revisarse.