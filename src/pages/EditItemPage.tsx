import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { InventoryContext } from "../context/InventoryContext";
import { IonContent, IonPage, IonToast } from "@ionic/react";

const EditItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const context = useContext(InventoryContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (context) {
      const item = context.items.find((item) => item.id === parseInt(id, 10));
      if (item) {
        setName(item.name);
        setDescription(item.description);
        setQuantity(item.quantity);
      }
    }
  }, [context, id]);

  if (!context) {
    return <div>No se pudo cargar el contexto de inventario.</div>;
  }

  const { updateItem } = context;

  const handleSave = () => {
    if (name.trim() === "" || description.trim() === "" || quantity <= 0) {
      setShowAlert(true);
      return;
    }

    const updatedItem = { id: parseInt(id, 10), name, description, quantity };
    updateItem(updatedItem);
    setShowToast(true);
    setTimeout(() => history.push("/home"), 2000); // Redirige a la página de inicio después de mostrar la notificación
  };

  const handleVolver = () => {
    history.goBack(); // Vuelve a la página anterior en el historial
  };

  return (
    <IonPage>
      <IonContent>
        <div className="p-6 min-h-screen">
          <div className="shadow-md bg-white rounded-lg p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Editar Ítem
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-black text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-black text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-black text-black"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 mt-4"
            >
              Guardar Cambios
            </button>
            <button
              onClick={handleVolver}
              className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 mt-2"
            >
              Volver
            </button>
          </div>

          {showAlert && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 max-w-lg mx-auto"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">
                Por favor, completa todos los campos correctamente.
              </span>
            </div>
          )}

          {showToast && (
            <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message="Ítem actualizado."
              duration={2000}
              color="success"
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditItemPage;
