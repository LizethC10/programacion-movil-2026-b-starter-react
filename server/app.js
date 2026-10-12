/**
 * API de productos (Express).
 * Las rutas implementan el contrato del parcial.
 */
const express = require('express');
const cors = require('cors');
const seedProducts = require('./data/products.json');

const CATEGORIES = ['Bebidas', 'Snacks', 'Aseo', 'Hogar'];

function parseId(rawId) {
  return /^\d+$/.test(rawId) ? Number(rawId) : null;
}

function createApp() {
  const app = express();

  // Permite que la app Ionic llame a la API y procesa cuerpos JSON.
  app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
  app.use(express.json());

  // Los datos viven en memoria y se reinician con el servidor.
  const products = seedProducts.map((item) => ({ ...item }));
  let nextId = Math.max(0, ...products.map((product) => product.id)) + 1;

  function validateProductInput(input) {
    const details = [];
    const { name, price, category, stock } = input;

    if (typeof name !== 'string' || name.trim() === '') {
      details.push('name es obligatorio');
    } else if (name.trim().length > 60) {
      details.push('name no puede superar 60 caracteres');
    }

    if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
      details.push('price debe ser un número mayor que 0');
    }

    if (typeof category !== 'string' || !CATEGORIES.includes(category)) {
      details.push('category debe ser Bebidas, Snacks, Aseo u Hogar');
    }

    if (!Number.isInteger(stock) || stock < 0) {
      details.push('stock debe ser un entero mayor o igual que 0');
    }

    return details;
  }

  // GET /api/products: lista y filtros opcionales.
  app.get('/api/products', (req, res) => {
    const search = typeof req.query.search === 'string'
      ? req.query.search.trim().toLowerCase()
      : '';
    const category = typeof req.query.category === 'string'
      ? req.query.category
      : '';

    const result = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search);
      const matchesCategory = category === '' || product.category === category;
      return matchesSearch && matchesCategory;
    });

    return res.status(200).json(result);
  });

  // GET /api/products/:id: obtiene un producto.
  app.get('/api/products/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({
        error: 'Id inválido',
        details: ['id debe ser numérico'],
      });
    }

    const product = products.find((item) => item.id === id);

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado',
        details: [`No existe un producto con id ${id}`],
      });
    }

    return res.status(200).json(product);
  });

  // POST /api/products: valida y crea un producto.
  app.post('/api/products', (req, res) => {
    const input = req.body && typeof req.body === 'object' && !Array.isArray(req.body)
      ? req.body
      : {};
    const details = validateProductInput(input);

    if (details.length > 0) {
      return res.status(400).json({ error: 'Datos inválidos', details });
    }

    const product = {
      id: nextId,
      name: input.name.trim(),
      price: input.price,
      category: input.category,
      stock: input.stock,
    };

    nextId += 1;
    products.push(product);

    return res.status(201).json(product);
  });

  // PUT /api/products/:id: valida y reemplaza los datos del producto.
  app.put('/api/products/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({
        error: 'Id inválido',
        details: ['id debe ser numérico'],
      });
    }

    const index = products.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({
        error: 'Producto no encontrado',
        details: [`No existe un producto con id ${id}`],
      });
    }

    const input = req.body && typeof req.body === 'object' && !Array.isArray(req.body)
      ? req.body
      : {};
    const details = validateProductInput(input);

    if (details.length > 0) {
      return res.status(400).json({ error: 'Datos inválidos', details });
    }

    const updatedProduct = {
      id,
      name: input.name.trim(),
      price: input.price,
      category: input.category,
      stock: input.stock,
    };

    products[index] = updatedProduct;

    return res.status(200).json(updatedProduct);
  });

  // DELETE /api/products/:id: elimina el producto sin cuerpo de respuesta.
  app.delete('/api/products/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({
        error: 'Id inválido',
        details: ['id debe ser numérico'],
      });
    }

    const index = products.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({
        error: 'Producto no encontrado',
        details: [`No existe un producto con id ${id}`],
      });
    }

    products.splice(index, 1);
    return res.status(204).end();
  });

  // Manejador dado: ruta desconocida.
  app.use((req, res) => {
    res.status(404).json({
      error: 'Ruta no encontrada',
      details: [`${req.method} ${req.originalUrl}`],
    });
  });

  // Manejador dado: errores del servidor.
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    if (err && err.type === 'entity.parse.failed') {
      return res.status(400).json({
        error: 'El cuerpo no es un JSON válido',
        details: [],
      });
    }

    console.error(err);
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: [],
    });
  });

  return app;
}

module.exports = { createApp, CATEGORIES, parseId };