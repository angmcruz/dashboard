import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';

interface selectorciudades {
  cambiarcity: (city: string) => void;
}

const Ciudades: React.FC<selectorciudades> = ({ cambiarcity }) => {


  const [city, setCity] = useState<string>('');
  const [cities, setCities] = useState<string[]>(['Guayaquil', 'Quito', 'Cuenca']); // Lista de ciudades

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCity(event.target.value as string);
  };

  const handleButtonClick = () => {
    cambiarcity(city);
  };

  return (
    <Box sx={{ minWidth: 120, display: 'flex', alignItems: 'center' }}>
      <FormControl fullWidth>
        <InputLabel id="city-select-label">Ciudad</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={city}
          onChange={handleChange}
        >
          {cities.map((city, index) => (
            <MenuItem key={index} value={city}>{city}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleButtonClick} sx={{ ml: 2 }}>
        Cargar Datos
      </Button>
    </Box>
  );
};

export default Ciudades;