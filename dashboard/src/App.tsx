
import './App.css'
import Grid from '@mui/material/Unstable_Grid2';
import BasicTable from './components/BasicTable';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPane';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import Ciudades from './components/Ciudades';
import sunrise from './assets/sunrise.jpeg'
import sunset from './assets/sunset.jpeg'




  interface RowProps {
	rangeHours: string;
	windDirection: string;
	pressure: string;
  	temperature: string;
  	clouds: string;
  }


function App() {

	let [Indicators, setIndicators] = useState<React.ReactNode[]>([]);
	let [rowsTable, setRowsTable] = useState<RowProps[]>([]);
	let [selectedCity, setSelectedCity] = useState('Guayaquil');
	let [currentTime, setCurrentTime] = useState("");
	let [currentDate, setCurrentDate] = useState("");
	



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
				//contenido de la tabla
				let rangeHours = from.split("T")[1] + " - " + to.split("T")[1];
				let windDirectionElement = timeElement.getElementsByTagName("windDirection")[0];
				let windDirection = (windDirectionElement?.getAttribute("deg") ?? '') + " " + (windDirectionElement?.getAttribute("code") ?? '');
          		let pressure = timeElement.getElementsByTagName("pressure")[0]?.getAttribute("value") ?? '';
          		let temperature = timeElement.getElementsByTagName("temperature")[0]?.getAttribute("value") ?? '';
         		 let clouds = timeElement.getElementsByTagName("clouds")[0]?.getAttribute("all") ?? '';
				return { rangeHours, windDirection, pressure,temperature,clouds};
			  }
			  return { rangeHours: '', windDirection: '' , pressure: '' ,temperature: '',clouds: ''};
			});

			arrayObjects = arrayObjects.slice(0, 8)

			setRowsTable(arrayObjects)


			};
	
			

		})()




	}, [selectedCity])

	//seleccionador de ciudad
	const handleCityChange = (city:string) => {
        setSelectedCity(city);
    };


	//fecha y hora local
	useEffect(() => {
		const fetchCurrentTime = async () => {

			const response = await fetch("https://worldtimeapi.org/api/timezone/America/Guayaquil");
			const data = await response.json();

			const date = new Date(data.datetime);
			const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
			setCurrentTime(`${formattedDate} | Hora: ${formattedTime}`);
			
	
		};
		fetchCurrentTime();


		const setDate = async () => {

			const response = await fetch("https://worldtimeapi.org/api/timezone/America/Guayaquil");
			const data = await response.json();

			const date = new Date(data.datetime);
			const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			
			setCurrentDate(`${formattedDate}`);
			
	
		};
		setDate();
	//intervalo de tiempo
		const interval = setInterval(fetchCurrentTime, 1000);
	
		return () => clearInterval(interval);
	  }, []);
	


	return (

		<>
		<Grid>
			<h1>
				NEW DASHBOARD
			</h1>
			<h3>
				Fecha: {currentTime}
			</h3>
		</Grid>
		<Header title="Informacion por Ciudad" city=''/>
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


			<Grid xs={12} sm={4} md={3} lg={6} >
			  <Summary title='Amanecer' hora= '05:19:08' imagen= {sunrise} fecha={currentDate}/>
			</Grid>
			
			<Grid xs={12} sm={4} md={3} lg={6}>
			  <Summary title='Atardecer' hora= '18:35:07' imagen={sunset} fecha={currentDate}/>
			</Grid>


		  </Grid>
  
		  <Header title="Datos de:" city={selectedCity} />
  
		  <Grid xs={12} container spacing={3}>
			<BasicTable rows={rowsTable} />
		  </Grid>
  
		  <Header title="Gráficos de:" city={selectedCity}/>
		  
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
