import React, { createContext, useState, ReactNode } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
  quantity: number;
}

interface InventoryContextProps {
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  deleteItem: (id: number) => void;
  logout: () => void; // Asegúrate de que esté definida aquí
}

interface InventoryProviderProps {
  children: ReactNode;
}

const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems([...items, { ...item, id: Date.now() }]);
  };

  const updateItem = (updatedItem: Item) => {
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Agregar la función logout
  const logout = () => {
    // Lógica para cerrar sesión, si se requiere
    console.log("Cerrando sesión desde InventoryContext");
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, updateItem, deleteItem, logout }}>
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryProvider, InventoryContext };
