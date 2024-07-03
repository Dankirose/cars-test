import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Car } from '../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix the default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface MapProps {
  cars: Car[];
}

const Map: React.FC<MapProps> = ({ cars }) => {
  return (
    <MapContainer center={[55.751244, 37.618423]} zoom={10} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cars.map(car => (
        <Marker key={car.id} position={[car.latitude, car.longitude]}>
          <Popup>
            {car.name} {car.model}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;