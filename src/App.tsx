import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Car } from './types';
import Card from './components/Card';
import Map from './components/Map';



const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [sortField, setSortField] = useState<string>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    axios.get('https://test.tspb.su/test-task/vehicles')
      .then(response => {
        setCars(response.data);
      });
  }, []);

  const handleSort = (field: string) => {
    const order = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    setCars([...cars].sort((a, b) => {
      if (a[field as keyof Car] > b[field as keyof Car]) {
        return order === 'asc' ? 1 : -1;
      } else {
        return order === 'asc' ? -1 : 1;
      }
    }));
  };

  const handleEdit = (id: number, updatedCar: Partial<Car>) => {
    setCars(cars.map(car => car.id === id ? { ...car, ...updatedCar } : car));
  };

  const handleDelete = (id: number) => {
    setCars(cars.filter(car => car.id !== id));
  };

  return (
    <div>
      <button onClick={() => handleSort('year')}>Sort by Year</button>
      <button onClick={() => handleSort('price')}>Sort by Price</button>
      <div className='card-container'>
        {cars.map(car => (
          <Card key={car.id} car={car} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
      <Map cars={cars} />
    </div>
  );
}

export default App;