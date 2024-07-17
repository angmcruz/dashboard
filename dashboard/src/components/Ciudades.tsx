import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';



interface Cities{
    onCityChange: (city: string) => void;
}

function Ciudades({ onCityChange} : Cities) {
    const [city, setCity] = useState('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCity(event.target.value as string);
        onCityChange(event.target.value as string);
      };

    useEffect(() => {
         // definimos
    }, []);

     
    return (
        <FormControl fullWidth>
            <InputLabel id="city-selector-label">Ciudad</InputLabel>
            <Select
                labelId="city-selector-label"
                id="city-selector"
                value={city}
                label="Ciudad"
                onChange={handleChange}
            >
                <MenuItem value="Guayaquil">Guayaquil</MenuItem>
                <MenuItem value="Quito">Quito</MenuItem>
                <MenuItem value="Cuenca">Cuenca</MenuItem>
            </Select>
        </FormControl>
    );
}

export default Ciudades;