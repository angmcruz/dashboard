import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';


interface Summary {
    title: string;
    hora: string;
    imagen: string;
    fecha:string;
    
  }
  
  
  const Summary: React.FC<Summary> = ({ title,hora,imagen,fecha})  => {
    
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image= {imagen}
                    alt="Amanecer"
                />
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                        {title}
                    </Typography>
                    <Typography component="p" variant="h4">
                        {hora}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        {fecha}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
} 

export default Summary;
