import { Chart } from "react-google-charts";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';



interface WeatherChart {
    city: string;
    valor: number;

}
type WeatherData = [string, string, string, string] | [string, number, number, number];

export default function WeatherChart({city,valor}: WeatherChart) {

    let [data, setData] = useState<(string | number)[][]>([
        ["Hora", "Precipitación", "Humedad", "Nubosidad"]
    ]);
    

    {/* Configuración */}

    let options = {
        title: "Precipitación, Humedad y Nubosidad vs Hora",
        curveType: "function",
        legend: { position: "right" },
    }

    {/* Datos de las variables meteorológicas */}

   
    useEffect(() => {
       
        let datosbycity: { [key: string]: WeatherData[] } = {
            "Guayaquil": [
                ["Hora", "Precipitación", "Humedad", "Nubosidad"],
                ["03:00", 13, 78, 75],
                ["06:00", 4, 81, 79],
                ["09:00", 7, 82, 69],
                ["12:00", 3, 73, 62],
                ["15:00", 4, 66, 75],
                ["18:00", 6, 64, 84],
                ["21:00", 5, 77, 99]
            ],
            "Quito": [
                ["Hora", "Precipitación", "Humedad", "Nubosidad"],
                ["03:00", 5, 88, 45],
                ["06:00", 6, 90, 50],
                ["09:00", 10, 85, 40],
                ["12:00", 0, 75, 35],
                ["15:00", 2, 70, 30],
                ["18:00", 3, 65, 45],
                ["21:00", 7, 80, 60]
            ],
            "Cuenca": [
                ["Hora", "Precipitación", "Humedad", "Nubosidad"],
                ["03:00", 4, 80, 50],
                ["06:00", 6, 90, 50],
                ["09:00", 12, 85, 45],
                ["12:00", 0, 75, 35],
                ["15:00", 1, 70, 30],
                ["18:00", 2, 63, 45],
                ["21:00", 5, 82, 60]
            ]
           
        };
        const total = (datosbycity[city] || [["Hora", 0, 1, 2]]);

        if (valor ==0) {

            setData(total);

        } else {
            const filtradas = total.map((row) => {
                if (valor === 1) {
                    return [row[0], row[1]];
                } else if (valor === 2) {
                    return [row[0], row[2]];
                } else if (valor === 3) {
                    return [row[0], row[3]];
                }
                return row;
            });
            setData(filtradas);
        }

    }, [city,valor]);

    {/* JSX */}

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Chart
                chartType="LineChart"
                data={data}
                width="100%"
                height="400px"
                options={options}
                legendToggle
        />
        </Paper>
    )
}	