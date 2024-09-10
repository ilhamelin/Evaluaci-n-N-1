import React, { useState } from "react";

interface ItemFormProps {
  onSubmit: (item: {
    name: string;
    description: string;
    quantity: number;
  }) => void;
  initialData?: { name: string; description: string; quantity: number };
}

import retail from "../image/lista.png";

const ItemForm: React.FC<ItemFormProps> = ({
  onSubmit,
  initialData = { name: "", description: "", quantity: 0 },
}) => {
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);
  const [quantity, setQuantity] = useState(initialData.quantity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, quantity });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg  max-w-lg mx-auto mt-6"
    >
      <div className="flex">
        <img className="w-[50%] mx-[118px]" src={retail} />
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Agregar Producto
      </h2>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Nombre del Ítem
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese el nombre del ítem"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out bg-white placeholder:text-black text-black"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingrese la descripción"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out bg-white placeholder:text-black text-black"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Cantidad
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Ingrese la cantidad"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out bg-white placeholder:text-black text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-150 ease-in-out"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
