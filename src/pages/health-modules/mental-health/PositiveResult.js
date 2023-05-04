import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function PositiveResult(props) {
    const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 1500, height: 900, ml: 10, mr: 10, justifyContent: 'center' }}>
            <img src='https://images.newscientist.com/wp-content/uploads/2018/08/28160235/180825coverimage.jpg' alt='positive' width='200px'height="200px"></img>
            <CardContent>
                <Typography sx={{ fontWeight: 'bold', fontSize: 70, textAlign: 'center' }} gutterBottom variant="h5" component="div">
                    Your Mental Health Score is {props.result}.
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }} variant="body2" color="text.secondary">
                    Your score is up to the mark and If you still wish to see a councillor we recommend you to book an appointment with our
                    Mental Health Specialist by clicking the button below.
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Link
                    component="button"
                    sx={{ fontWeight: 'bold', fontSize: 20 }}
                    variant="body2"
                    onClick={() => {
                        navigate('/mentalcheck');
                    }}
                >
                    Go to the Home Page
                </Link>
                <Link
                    component="button"
                    sx={{ fontWeight: 'bold', fontSize: 20 }}
                    variant="body2"
                    onClick={() => {
                         navigate('/mentalspecialist');
                    }}
                >
                    Look up for Mental Health Councillor
                </Link>
            </CardActions>
        </Card>
    );
}

export default PositiveResult;
