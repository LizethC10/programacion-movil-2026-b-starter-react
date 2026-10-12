# Definition of Done — Catálogo de productos

## Documentación

- [ ] `features/productos.md` describe la funcionalidad.
- [ ] Existen las especificaciones de lista, detalle y formulario.
- [ ] Existen `ADR-001-estado.md` y `ADR-002-consumo-api.md`, con contexto, decisión y consecuencias.
- [ ] `api/products-endpoints.md` documenta los cinco endpoints.
- [ ] `api/product-entity.md` documenta los campos y reglas de Product.
- [ ] La documentación está completa y tiene un commit anterior al primer commit de código.

## API Express

- [ ] Funcionan los cinco endpoints de productos.
- [ ] `GET /api/products` admite filtros `search` y `category`.
- [ ] `POST` y `PUT` validan todos los campos y devuelven los errores con `error` y `details`.
- [ ] Los códigos HTTP y las respuestas cumplen el contrato del parcial.
- [ ] Hay una prueba que provoque un 404 o un 500 y una explicación en inglés.

## Aplicación Ionic React

- [ ] La lista carga productos desde la API y permite buscar y filtrar por categoría.
- [ ] La lista muestra los estados de carga, vacío, sin resultados y error con reintento.
- [ ] El detalle muestra todos los campos del producto.
- [ ] El formulario permite crear y editar con validación.
- [ ] La app puede crear, consultar, actualizar y eliminar productos por medio de la API.
- [ ] Los componentes y capas siguen la estructura solicitada.

## Kotlin

- [ ] `kotlin/Product.kt` contiene la clase Product con los campos solicitados.
- [ ] `stockLabel` maneja `null` y muestra las etiquetas requeridas.
- [ ] `applyDiscount` calcula el descuento.
- [ ] `main()` imprime tres productos con etiqueta y precio con 10 % de descuento.
- [ ] El código compila y corre en Kotlin Playground.

## Calidad y entrega

- [ ] Hay al menos dos pruebas unitarias y dos pruebas de API nuevas.
- [ ] `npm test` pasa.
- [ ] `.env` está ignorado y `.env.example` está presente, sin secretos.
- [ ] El README explica cómo ejecutar `npm run server` y `npm run dev`.
- [ ] El README incluye las secciones en inglés `State management decision` y `API error handling`, con 3 a 5 frases cada una.
- [ ] La rama de trabajo se llama `feature/catalogo-productos`.
- [ ] Hay al menos seis commits con formato Conventional Commits.
- [ ] El PR hacia `main` del fork tiene descripción y esta checklist marcada.