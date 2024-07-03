// src/components/Card.tsx
import React, { useState } from 'react';
import { Car } from '../types';

interface CardProps {
  car: Car;
  onEdit: (id: number, updatedCar: Partial<Car>) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ car, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCar, setEditedCar] = useState(car);

  const handleSave = () => {
    onEdit(car.id, editedCar);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedCar.name}
            onChange={(e) => setEditedCar({ ...editedCar, name: e.target.value })}
          />
          <input
            type="text"
            value={editedCar.model}
            onChange={(e) => setEditedCar({ ...editedCar, model: e.target.value })}
          />
          <input
            type="text"
            value={editedCar.color}
            onChange={(e) => setEditedCar({ ...editedCar, color: e.target.value })}
          />
          <input
            type="number"
            value={editedCar.price}
            onChange={(e) => setEditedCar({ ...editedCar, price: +e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{car.name} {car.model}</h3>
          <p>Year: {car.year}</p>
          <p>Color: {car.color}</p>
          <p>Price: {car.price}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(car.id)}>Delete</button>
    </div>
  );
}

export default Card;