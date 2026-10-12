import { IonBadge, IonItem, IonLabel } from '@ionic/react';
import type { ProductView } from '../domain/product';

export interface ProductCardProps {
  product: ProductView;
  onSelect?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const stockColor = product.isOutOfStock
    ? 'medium'
    : product.isLowStock
      ? 'warning'
      : 'success';

  return (
    <IonItem
      button={Boolean(onSelect)}
      onClick={() => onSelect?.(product.id)}
      detail={Boolean(onSelect)}
    >
      <IonLabel>
        <h2>{product.name}</h2>
        <p>{product.category} · {product.priceLabel}</p>
        <p>Stock: {product.stock}</p>
      </IonLabel>
      <IonBadge color={stockColor} slot="end">
        {product.stockLabel}
      </IonBadge>
    </IonItem>
  );
};

export default ProductCard;