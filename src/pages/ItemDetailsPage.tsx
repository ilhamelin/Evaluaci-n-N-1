import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IonPage, IonContent, IonToast, IonAlert } from "@ionic/react";
import { InventoryContext } from "../context/InventoryContext";

const ItemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const context = useContext(InventoryContext);

  const [item, setItem] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const username = localStorage.getItem("username");

  useEffect(() => {
    if (context) {
      const foundItem = context.items.find(
        (item) => item.id === parseInt(id, 10)
      );
      if (foundItem) {
        setItem(foundItem);
      } else {
        history.push(`/home/${username}`); // Redirige si no encuentra el ítem
      }
    }
  }, [context, id, history, username]);

  if (!item) {
    return (
      <IonPage>
        <IonContent className="p-4">
          <p>No se pudo encontrar el ítem.</p>
        </IonContent>
      </IonPage>
    );
  }

  const handleDelete = () => {
    setShowAlert(true); // Mostrar alerta de confirmación antes de eliminar
  };

  const confirmDelete = () => {
    if (context) {
      context.deleteItem(item.id);
      setShowToast(true);
      setTimeout(() => {
        history.push(`/home/${username}`); // Redirige a home con el username
      }, 2000);
    }
  };

  const handleEdit = () => {
    history.push(`/edit-item/${item.id}`); // Redirige a la página de edición
  };

  const handleVolver = () => {
    history.goBack(); // Vuelve a la página anterior en el historial
  };

  return (
    <IonPage>
      <IonContent className="p-4">
        <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto mt-6">
          <img
            src={`https://via.placeholder.com/150?text=${item.name}`}
            alt={item.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
          </div>
          <div className="mt-4">
            <p>Descripción: {item.description}</p>
            <p>Cantidad: {item.quantity}</p>
            <button
              onClick={handleEdit}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mt-4"
            >
              Editar Ítem
            </button>
            <button
              onClick={handleDelete}
              className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 mt-2"
            >
              Eliminar Ítem
            </button>
            <div className="">
              <button
                onClick={handleVolver}
                className="mt-4 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 w-full"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Ítem eliminado"
          duration={2000}
        />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Confirmar Eliminación"
          message="¿Estás seguro de que deseas eliminar este ítem?"
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "Eliminar",
              handler: confirmDelete, // Llama a confirmDelete para eliminar
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ItemDetailsPage;
