import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonToast,
} from "@ionic/react";
import { InventoryContext } from "../context/InventoryContext";
import { useAuth } from "../context/AuthContext";

const HomePage: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const context = useContext(InventoryContext);
  const { username } = useParams<{ username: string }>();
  const history = useHistory(); // Hook para la redirección
  const { isAuthenticated, logout } = useAuth();

  if (!context) {
    return <div>No se pudo cargar el inventario.</div>;
  }

  const { items, deleteItem } = context;

  const handleDelete = (id: number) => {
    deleteItem(id);
    setShowToast(true);
  };

  const handleLogout = () => {
    // Actualizar el estado de autenticación a false
    context.logout(); // o setAuthenticated(false), dependiendo de cómo manejes la autenticación
  
    // Redirige al login
    history.push("/");
    window.location.reload(); // Forzar recarga para asegurarse de que el estado de autenticación se refleje correctamente
  };

  return (
    <IonPage>
      <IonContent>
        <div className="p-4">
          <div className="flex space-x-3 justify-center items-center">
            <IonText>
              <h1 className="text-2xl font-bold mb-4">
                ¡Bienvenido, {username}!
              </h1>
            </IonText>
            <IonButton
              expand="full"
              color="medium"
              onClick={handleLogout}
              className="mb-4"
            >
              Cerrar Sesión
            </IonButton>
          </div>
          <IonButton
            expand="full"
            routerLink="/add-item"
            color="primary"
            className="mb-4"
          >
            Añadir Nuevo Producto
          </IonButton>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={`https://via.placeholder.com/150?text=${item.name}`}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    <p className="text-xl font-bold text-gray-800 mt-4">
                      ${item.quantity * 10}
                    </p>
                    <div className="flex justify-between mt-4">
                      <IonButton
                        expand="block"
                        routerLink={`/item-details/${item.id}`}
                        color="secondary"
                        className="mr-2"
                      >
                        Ver Detalles
                      </IonButton>
                      <IonButton
                        expand="block"
                        color="danger"
                        onClick={() => handleDelete(item.id)}
                        className="ml-2"
                      >
                        Eliminar
                      </IonButton>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center">
                <IonText color="medium">
                  <p>No hay ítems en el inventario.</p>
                </IonText>
              </div>
            )}
          </div>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Ítem eliminado"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
function logout() {
  throw new Error("Function not implemented.");
}

