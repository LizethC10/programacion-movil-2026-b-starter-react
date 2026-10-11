import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getErrorMessage } from '../data/api-error';
import { deleteProduct, getProduct } from '../data/products-api';
import type { Product } from '../domain/product';
import { toProductView } from '../domain/product';
import EmptyState from './EmptyState';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadProduct = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    if (!Number.isInteger(productId) || productId <= 0) {
      setErrorMessage('El identificador del producto no es válido.');
      setLoading(false);
      return;
    }

    try {
      setProduct(await getProduct(productId));
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    void loadProduct();
  }, [loadProduct]);

  const handleDelete = async () => {
    setDeleting(true);
    setErrorMessage('');

    try {
      await deleteProduct(productId);
      history.push('/productos');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setConfirmDelete(false);
    } finally {
      setDeleting(false);
    }
  };

  const view = product ? toProductView(product) : null;
  const badgeColor = view?.isOutOfStock
    ? 'medium'
    : view?.isLowStock
      ? 'warning'
      : 'success';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/productos" />
          </IonButtons>
          <IonTitle>Detalle del producto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading && <p>Cargando producto…</p>}

        {!loading && errorMessage && (
          <EmptyState
            title="No se pudo cargar el producto"
            message={errorMessage}
            actionLabel="Reintentar"
            onAction={() => void loadProduct()}
          />
        )}

        {!loading && !errorMessage && view && (
          <>
            <IonList>
              <IonItem>
                <IonLabel>
                  <h2>{view.name}</h2>
                  <p>Precio: {view.priceLabel}</p>
                  <p>Categoría: {view.category}</p>
                  <p>Stock: {view.stock}</p>
                </IonLabel>
                <IonBadge color={badgeColor}>{view.stockLabel}</IonBadge>
              </IonItem>
            </IonList>

            <IonButton
              expand="block"
              routerLink={`/productos/${productId}/editar`}
              className="ion-margin-top"
            >
              Editar
            </IonButton>

            {!confirmDelete ? (
              <IonButton
                expand="block"
                color="danger"
                onClick={() => setConfirmDelete(true)}
              >
                Eliminar
              </IonButton>
            ) : (
              <div className="ion-margin-top">
                <p>¿Eliminar este producto?</p>
                <IonButton
                  color="danger"
                  onClick={() => void handleDelete()}
                  disabled={deleting}
                >
                  {deleting ? 'Eliminando…' : 'Confirmar'}
                </IonButton>
                <IonButton
                  fill="outline"
                  onClick={() => setConfirmDelete(false)}
                  disabled={deleting}
                >
                  Cancelar
                </IonButton>
              </div>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductDetailPage;