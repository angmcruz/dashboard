
import './App.css'
import Grid from '@mui/material/Unstable_Grid2';
import BasicTable from './components/BasicTable';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPane';

function App() {
	return (
    <>   

    <Grid container spacing={5}>
      <Grid xs={12} md={4} lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>
      <Grid xs={12} md={4} lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>
      <Grid xs={12} md={4} lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>
      <Grid xs={12} md={4} lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>
      <Grid xs={12} md={4} lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>
      <Grid xs={12} md={4} lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>
      <Grid xs={12} sm={4} md={3} lg={2}>
	        <Summary></Summary>
	    </Grid> 
      <Grid xs={12} md={6} lg={9} >
	       <BasicTable />
	    </Grid>  
		<Grid xs={12} lg={2}>
             <ControlPanel />
         </Grid>
		<Grid xs={12} lg={10}>
             <WeatherChart></WeatherChart>
         </Grid>

      </Grid> 
      </>    
	
	)
}


export default App
