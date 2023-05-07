import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { getStorage } from 'utils/localstorage-utils';

function NegativeResult(props) {
    const navigate = useNavigate();
    const userName = getStorage('name');
    const userRole = getStorage('role');
    return (
        <Card sx={{ maxWidth: 1500, height: 900, ml: 10, mr: 10, justifyContent: 'center' }}>
            <CardContent>
                <Typography sx={{ fontWeight: 'bold', fontSize: 70, textAlign: 'center' }} gutterBottom variant="h5" component="div">
                    Your Mental Health Score is {props.result}.
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }} variant="body2" color="text.secondary">
                    Your score seems to be low and we recommend you to book an appointment with our Mental Health Specialist by clicking the
                    button below.
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                    component="button"
                    sx={{ fontWeight: 'bold', fontSize: 20 }}
                    variant="outlined"
                    onClick={() => {
                         navigate('/mentalcheck');
                    }}
                >
                    Go to the Home Page
                </Button>
                <Button
                    sx={{ fontWeight: 'bold', fontSize: 20 }}
                    variant="contained"
                    onClick={() => {
                        if(!userName || !userRole){
                            // not logged in user
                            navigate('/newuser/doctors/mental-health-professionals');
                        }else{
                            // logged in user
                            navigate('/doctors/mental-health-professionals');
                        }
                        //  navigate('/doctors/mental-health-professionals');
                    }}
                >
                    Look up for Mental Health Councillor
                </Button>
            </CardActions>
        </Card>
    );
}

export default NegativeResult;
