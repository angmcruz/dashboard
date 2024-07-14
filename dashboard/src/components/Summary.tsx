import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import sunrise from '../assets/sunrise.jpeg'
interface Summary {
    title: string;
    hora: string;
    
  }
  
  
  const Summary: React.FC<Summary> = ({ title,hora })  => {
    
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={sunrise}
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
                        en 28 July, 2024
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
} 

export default Summary;
