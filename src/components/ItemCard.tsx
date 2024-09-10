import React from 'react';
import { IonCard, IonCardContent, IonButton } from '@ionic/react';

interface Item {
  id: number;
  name: string;
  description: string;
  quantity: number;
}

const ItemCard: React.FC<{ item: { name: string; description: string; quantity: number; image: string } }> = ({ item }) => {
    return (
      <div className="max-w-lg mx-auto mt-4">
        <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
        <p>{item.description}</p>
        <p>Cantidad: {item.quantity}</p>
        {item.image && <img src={item.image} alt={item.name} className="mt-4 max-w-xs" />}
      </div>
    );
  };

export default ItemCard;
