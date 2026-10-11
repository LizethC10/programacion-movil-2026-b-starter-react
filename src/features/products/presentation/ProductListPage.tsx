import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getErrorMessage } from '../data/api-error';
import { getProducts } from '../data/products-api';
import type { Product } from '../domain/product';
import { CATEGORIES, filterProducts, toProductView } from '../domain/product';
import EmptyState from './EmptyState';
import ProductCard from './ProductCard';

type LoadStatus = 'loading' | 'ready' | 'error';

const CATEGORY_FILTERS = ['Todas', ...CATEGORIES];

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const isLoadingRef = useRef(false);
  const history = useHistory();

  const loadProducts = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setStatus('loading');
    setErrorMessage('');

    try {
      setProducts(await getProducts());
      setStatus('ready');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setStatus('error');
    } finally {
      isLoadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  useIonViewWillEnter(() => {
    void loadProducts();
  });

  const filteredProducts = filterProducts(products, { search, category });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSearchbar
          value={search}
          placeholder="Buscar por nombre"
          onIonInput={(event) => setSearch(event.detail.value ?? '')}
        />

        <div className="ion-padding-horizontal">
          {CATEGORY_FILTERS.map((item) => {
            const selected = item === 'Todas' ? category === '' : category === item;

            return (
              <IonButton
                key={item}
                fill={selected ? 'solid' : 'outline'}
                onClick={() => setCategory(item === 'Todas' ? '' : item)}
              >
                {item}
              </IonButton>
            );
          })}
        </div>

        {status === 'loading' && (
          <p className="ion-padding">Cargando productos…</p>
        )}

        {status === 'error' && (
          <EmptyState
            title="No se pudo cargar"
            message={errorMessage}
            actionLabel="Reintentar"
            onAction={() => void loadProducts()}
          />
        )}

        {status === 'ready' && products.length === 0 && (
          <EmptyState
            title="No hay productos"
            message="Todavía no se han agregado productos al catálogo."
          />
        )}

        {status === 'ready' &&
          products.length > 0 &&
          filteredProducts.length === 0 && (
            <EmptyState
              title="Sin resultados"
              message="Prueba con otra búsqueda o categoría."
            />
          )}

        {status === 'ready' && filteredProducts.length > 0 && (
          <IonList>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={toProductView(product)}
                onSelect={(id) => history.push(`/productos/${id}`)}
              />
            ))}
          </IonList>
        )}

        <IonButton routerLink="/productos/nuevo" className="ion-margin">
          Nuevo producto
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProductListPage;