import React, { useState, useContext } from "react";
import { IonPage, IonContent, IonButton, IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { InventoryContext } from "../context/InventoryContext";
import ItemForm from "../components/ItemForm";

const AddItemPage: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const context = useContext(InventoryContext);
  const history = useHistory();

  if (!context) {
    return (
      <IonPage>
        <IonContent className="ion-padding flex items-center justify-center bg-gray-100">
          <div className="text-center text-red-600 font-semibold">
            No se pudo cargar el contexto de inventario.
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const { addItem } = context;

  const handleSubmit = (item: {
    name: string;
    description: string;
    quantity: number;
  }) => {
    addItem({ ...item, id: 0 }); // Suponiendo que el ID se asignará en el contexto
    setShowToast(true); // Mostrar la notificación
  };

  const handleVolver = () => {
    history.goBack(); // Vuelve a la página anterior en el historial
  };

  return (
    <IonPage>
      <IonContent className="ion-padding bg-gray-100">
        <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            Agregar Nuevo Ítem
          </h1>
          <ItemForm onSubmit={handleSubmit} />
          <div className="mx-6">
            <button
              onClick={handleVolver}
              className="mt-4 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 w-full"
            >
              Volver
            </button>
          </div>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Ítem guardado"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default AddItemPage;
