import { describe, expect, it } from 'vitest';
import seedProducts from '../../../../server/data/products.json';
import {
  CATEGORIES,
  filterProducts,
  formatCOP,
  LOW_STOCK_THRESHOLD,
  toProductView,
  validateProduct,
} from '../domain/product';

describe('datos semilla de la API', () => {
  it('trae 8 productos con ids 1 a 8', () => {
    expect(seedProducts).toHaveLength(8);
    expect(seedProducts.map((item) => item.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('usa categorías permitidas y stock entero no negativo', () => {
    for (const item of seedProducts) {
      expect(CATEGORIES).toContain(item.category);
      expect(Number.isInteger(item.stock)).toBe(true);
      expect(item.stock).toBeGreaterThanOrEqual(0);
    }
  });

  it('incluye productos agotados y con pocas unidades', () => {
    expect(seedProducts.some((item) => item.stock === 0)).toBe(true);
    expect(
      seedProducts.some(
        (item) => item.stock > 0 && item.stock < LOW_STOCK_THRESHOLD,
      ),
    ).toBe(true);
  });
});

describe('formatCOP', () => {
  it('formatea el precio con separador de miles', () => {
    expect(formatCOP(1250000)).toBe('$ 1.250.000');
    expect(formatCOP(8500)).toBe('$ 8.500');
    expect(formatCOP(950)).toBe('$ 950');
  });
});

describe('validateProduct', () => {
  it('rechaza datos inválidos', () => {
    const result = validateProduct({
      name: '   ',
      price: 0,
      category: 'No válida',
      stock: -1,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeTruthy();
    expect(result.errors.price).toBeTruthy();
    expect(result.errors.category).toBeTruthy();
    expect(result.errors.stock).toBeTruthy();
  });

  it('acepta un producto válido', () => {
    const result = validateProduct({
      name: 'Agua mineral',
      price: 1800,
      category: 'Bebidas',
      stock: 10,
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
});

describe('toProductView', () => {
  it('formatea el precio y etiqueta el stock agotado', () => {
    const view = toProductView({
      id: 5,
      name: '  Galletas de avena  ',
      price: 2700,
      category: 'Snacks',
      stock: 0,
    });

    expect(view.name).toBe('Galletas de avena');
    expect(view.priceLabel).toBe('$ 2.700');
    expect(view.stockLabel).toBe('Agotado');
    expect(view.isOutOfStock).toBe(true);
    expect(view.isLowStock).toBe(false);
  });

  it('etiqueta el stock bajo', () => {
    const view = toProductView({
      id: 3,
      name: 'Gaseosa',
      price: 4800,
      category: 'Bebidas',
      stock: 4,
    });

    expect(view.stockLabel).toBe('Pocas unidades');
    expect(view.isLowStock).toBe(true);
    expect(view.isOutOfStock).toBe(false);
  });
});

describe('filterProducts', () => {
  it('filtra por texto sin distinguir mayúsculas y por categoría exacta', () => {
    const byName = filterProducts(seedProducts, {
      search: 'AGUA',
      category: '',
    });
    expect(byName.map((product) => product.id)).toEqual([1]);

    const byCategory = filterProducts(seedProducts, {
      search: '',
      category: 'Snacks',
    });
    expect(byCategory.every((product) => product.category === 'Snacks')).toBe(true);
    expect(byCategory).toHaveLength(2);
  });
});