
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

interface Config {
  rows: Row[];
}

interface Row {
  rangeHours: string;
  windDirection: string;
}



export default function BasicTable( rows: Config) {
  let [tablerows, setRows] = useState<Row[]>([]);

  useEffect( () => {

    (()=> {

        setRows(rows.rows)

    })()

}, [rows] )



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell>Rango de horas</TableCell>
          <TableCell align="right">Dirección del viento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tablerows.map((row) => (
            <TableRow
            key={row.rangeHours}  
        >
            <TableCell component="th" scope="row">
                {row.rangeHours}
            </TableCell>
            <TableCell align="right">{row.windDirection}</TableCell>
        </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}