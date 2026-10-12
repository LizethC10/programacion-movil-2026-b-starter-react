import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getErrorMessage } from '../data/api-error';
import { createProduct, getProduct, updateProduct } from '../data/products-api';
import type { ProductInput } from '../domain/product';
import { CATEGORIES, validateProduct } from '../domain/product';

const emptyProduct: ProductInput = {
  name: '',
  price: 0,
  category: '',
  stock: 0,
};

const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const isEditing = id !== undefined;

  const [form, setForm] = useState<ProductInput>(emptyProduct);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [serverDetails, setServerDetails] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const product = await getProduct(Number(id));
        setForm({
          name: product.name,
          price: product.price,
          category: product.category,
          stock: product.stock,
        });
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [id]);

  const validation = validateProduct(form);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setErrorMessage('');
    setServerDetails([]);

    if (!validation.isValid) return;

    setSaving(true);
    try {
      if (isEditing && id) {
        await updateProduct(Number(id), form);
      } else {
        await createProduct(form);
      }
      history.push('/productos');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));

      const details = (error as { details?: unknown })?.details;
      setServerDetails(Array.isArray(details) ? details.map(String) : []);
    } finally {
      setSaving(false);
    }
  };

  const fieldErrors = submitted ? validation.errors : {};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/productos" />
          </IonButtons>
          <IonTitle>{isEditing ? 'Editar producto' : 'Nuevo producto'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <p>Cargando producto…</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <IonInput
              label="Nombre"
              labelPlacement="floating"
              fill="outline"
              value={form.name}
              maxlength={60}
              onIonInput={(event) =>
                setForm({ ...form, name: String(event.detail.value ?? '') })
              }
            />
            {fieldErrors.name && <p role="alert">{fieldErrors.name}</p>}

            <IonInput
              className="ion-margin-top"
              label="Precio"
              labelPlacement="floating"
              fill="outline"
              type="number"
              min="0"
              value={form.price || ''}
              onIonInput={(event) =>
                setForm({ ...form, price: Number(event.detail.value ?? 0) })
              }
            />
            {fieldErrors.price && <p role="alert">{fieldErrors.price}</p>}

            <p className="ion-margin-top">Categoría</p>
            <div>
              {CATEGORIES.map((category) => (
                <IonButton
                  key={category}
                  type="button"
                  fill={form.category === category ? 'solid' : 'outline'}
                  onClick={() => setForm({ ...form, category })}
                >
                  {category}
                </IonButton>
              ))}
            </div>
            {fieldErrors.category && <p role="alert">{fieldErrors.category}</p>}

            <IonInput
              className="ion-margin-top"
              label="Stock"
              labelPlacement="floating"
              fill="outline"
              type="number"
              min="0"
              value={form.stock}
              onIonInput={(event) =>
                setForm({ ...form, stock: Number(event.detail.value ?? 0) })
              }
            />
            {fieldErrors.stock && <p role="alert">{fieldErrors.stock}</p>}

            {errorMessage && (
              <div className="ion-margin-top" role="alert">
                <p>{errorMessage}</p>
                {serverDetails.map((detail, index) => (
                  <p key={index}>
                    <IonBadge color="warning">{detail}</IonBadge>
                  </p>
                ))}
              </div>
            )}

            <IonButton
              className="ion-margin-top"
              expand="block"
              type="submit"
              disabled={saving}
            >
              {saving ? 'Guardando…' : 'Guardar producto'}
            </IonButton>
          </form>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductFormPage;