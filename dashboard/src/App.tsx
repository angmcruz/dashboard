
import './App.css'
import Grid from '@mui/material/Unstable_Grid2';
import BasicTable from './components/BasicTable';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPane';
import Header from './components/header';
import { useEffect, useState } from 'react';
import Ciudades from './components/Ciudades';




  interface RowTableProps {
	rangeHours: string;
	windDirection: string;
  }

function App() {

	let [Indicators, setIndicators] = useState<React.ReactNode[]>([]);
	let [rowsTable, setRowsTable] = useState<RowTableProps[]>([]);
	let [selectedCity, setSelectedCity] = useState('Guayaquil');


		//autoejecuta
	useEffect(() => {
		
		(async () => {

			//limpia  el storage
			 localStorage.removeItem("openWeatherMap");
			 localStorage.removeItem("expiringTime");
			{/* /* USAR LOCALSTORAGE REORGANIZAR CODIGO}*/ }
			let savedTextXML = localStorage.getItem("openWeatherMap")
			let expiringTime = localStorage.getItem("expiringTime")
			let nowTime = (new Date()).getTime();


			if (expiringTime === null || nowTime > parseInt(expiringTime)) {

				{/* 5. Request */ }

				let API_KEY = "c33c7a84485848efbc31c87efe17e9ef"
				let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&mode=xml&appid=${API_KEY}`)
				savedTextXML = await response.text();

				console.log(savedTextXML);
				{/* 6. Diferencia de tiempo */ }

				let hours = 1
				let delay = hours * 3600000


				{/* 7. En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */ }

				localStorage.setItem("openWeatherMap", savedTextXML)
				localStorage.setItem("expiringTime", (nowTime + delay).toString())
			}


			//xml parser (analizador)
			if(savedTextXML){
			const parser = new DOMParser();
			const xml = parser.parseFromString(savedTextXML, "application/xml");

			let dataToIndicators = new Array()

			// contenido el xml en el arreglo 
			let location = xml.getElementsByTagName("location")[1]

			let geobaseid = location.getAttribute("geobaseid")
			dataToIndicators.push(["Location", "geobaseid", geobaseid])

			let latitude = location.getAttribute("latitude")
			dataToIndicators.push(["Location", "Latitude", latitude])

			let longitude = location.getAttribute("longitude")
			dataToIndicators.push(["Location", "Longitude", longitude])
			
			console.log(dataToIndicators)

			//renderizado array
			let indicatorsElements = Array.from(dataToIndicators).map(
				(element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
			)

			//se modifica el estado de la variable por la funcion
			setIndicators(indicatorsElements);

			let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
				let from = timeElement.getAttribute("from");
				let to = timeElement.getAttribute("to");

			if (from && to) {
				let rangeHours = from.split("T")[1] + " - " + to.split("T")[1];
				let windDirectionElement = timeElement.getElementsByTagName("windDirection")[0];
				let windDirection = windDirectionElement.getAttribute("deg") + " " + windDirectionElement.getAttribute("code");
	
				return { rangeHours, windDirection };
			  }
			  return { rangeHours: '', windDirection: '' };
			});

			arrayObjects = arrayObjects.slice(0, 8)

			setRowsTable(arrayObjects)

			};

		})()




	}, [selectedCity])

	
	const handleCityChange = (city:string) => {
        setSelectedCity(city);
    };


	return (

		<>
		<Header title="New Dashboard: Ciudad Principal" />
		<Ciudades onCityChange={handleCityChange} />
		<Grid container spacing={3} sx={{ padding: 3 }}>
		  <Grid xs={12} container spacing={3}>
			<Grid xs={12} md={4} lg={3}>
			  {Indicators[0]}
			</Grid>
			<Grid xs={12} md={4} lg={3}>
			  {Indicators[1]}
			</Grid>
			<Grid xs={12} md={4} lg={3}>
			  {Indicators[2]}
			</Grid>
			<Grid xs={12} md={4} lg={3}>
			  <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
			</Grid>
			<Grid xs={12} sm={4} md={3} lg={5}>
			  <Summary />
			</Grid>
		  </Grid>
  
		  <Header title="Datos " />
  
		  <Grid xs={12} container spacing={3}>
			<BasicTable rows={rowsTable} />
		  </Grid>
  
		  <Header title="Gráficos" />
		  
		  <Grid xs={12} container spacing={3}>
			<Grid xs={12} lg={12}>
			  <ControlPanel />
			</Grid>
  
			<Grid xs={12} lg={12}>
			  <WeatherChart city={selectedCity} />
			</Grid>
		  </Grid>
		</Grid>
	  </>
    );
}


export default App
