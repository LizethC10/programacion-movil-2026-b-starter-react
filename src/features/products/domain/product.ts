/** Producto tal como lo entrega la API. */
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

/** Datos que captura el formulario (aún sin id). */
export interface ProductInput {
  name: string;
  price: number;
  category: string;
  stock: number;
}

/** Producto listo para mostrarse en la interfaz. */
export interface ProductView {
  id: number;
  name: string;
  priceLabel: string;
  category: string;
  stock: number;
  stockLabel: string;
  isLowStock: boolean;
  isOutOfStock: boolean;
}

/** Campos del formulario que pueden tener un error de validación. */
export type ProductField = 'name' | 'price' | 'category' | 'stock';

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<ProductField, string>>;
}

export interface ProductFilters {
  search: string;
  category: string;
}

export const CATEGORIES = ['Bebidas', 'Snacks', 'Aseo', 'Hogar'] as const;
export const NAME_MAX_LENGTH = 60;
export const LOW_STOCK_THRESHOLD = 5;

export function formatCOP(value: number): string {
  const digits = Math.round(value).toString();
  return `$ ${digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

export function toProductView(product: Product): ProductView {
  const isOutOfStock = product.stock === 0;
  const isLowStock =
    product.stock > 0 && product.stock < LOW_STOCK_THRESHOLD;

  let stockLabel = 'Disponible';
  if (isOutOfStock) {
    stockLabel = 'Agotado';
  } else if (isLowStock) {
    stockLabel = 'Pocas unidades';
  }

  return {
    id: product.id,
    name: product.name.trim(),
    priceLabel: formatCOP(product.price),
    category: product.category,
    stock: product.stock,
    stockLabel,
    isLowStock,
    isOutOfStock,
  };
}

export function validateProduct(input: ProductInput): ValidationResult {
  const errors: Partial<Record<ProductField, string>> = {};
  const name = typeof input.name === 'string' ? input.name.trim() : '';

  if (name === '') {
    errors.name = 'El nombre es obligatorio';
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.name = `El nombre no puede superar ${NAME_MAX_LENGTH} caracteres`;
  }

  if (!Number.isFinite(input.price) || input.price <= 0) {
    errors.price = 'El precio debe ser un número mayor que 0';
  }

  if (!CATEGORIES.some((category) => category === input.category)) {
    errors.category = 'Selecciona una categoría válida';
  }

  if (!Number.isInteger(input.stock) || input.stock < 0) {
    errors.stock = 'El stock debe ser un entero mayor o igual que 0';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  const search = filters.search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search);
    const matchesCategory =
      filters.category === '' || product.category === filters.category;

    return matchesSearch && matchesCategory;
  });
}