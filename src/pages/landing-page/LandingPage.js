import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getStorage } from 'utils/localstorage-utils';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Health Bridge
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cards = [1, 2, 3 ];

const theme = createTheme();



export default function LandingPage() {
    let navigate = useNavigate();

    const userName = getStorage('name');
    const userRole = getStorage('role');

    const medURL = '';
    const riskURL = '';

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative" sx={{ bgcolor: 'white' }}>
                <Toolbar>
                    <Typography
                        variant="h3"
                        color="#1976d2"
                        noWrap
                        sx={{ pt: 3, pb: 3, fontWeight: 'bold', fontFamily: 'Anton, sans-serif' }}
                    >
                        Health Bridge
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6
                    }}
                >
                    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Container maxWidth="md" sx={{ pt: 10 }}>
                            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                                Welcome to Health Bridge!
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                A service to connect patients and doctors.
                                <br />
                                Patients can book appointments and can get themeselves checked online and get prescribed.
                            </Typography>
                            <Stack sx={{ pt: 4, pb: 1 }} direction="row" spacing={2} justifyContent="center">
                                <Button variant="outlined"
                                    onClick = {() => {
                                        if(!userName || !userRole){
                                            // not logged in user
                                            navigate('/newuser/doctors');
                                        }else{
                                            // logged in user
                                            navigate('/doctors');
                                        }
                                    }}
                                    >
                                        Browse Doctors
                                    </Button>
                            </Stack>
                            <Typography variant="h5" align="center" color="text.primary" paragraph>
                                OR
                            </Typography>
                            {   !userName && !userRole && (
                                <Stack sx={{ pt: 1, pb: 4 }} direction="row" spacing={2} justifyContent="center">
                                    <Button href="/login" variant="contained">LOGIN</Button>
                                    <Button href="/register/patient" variant="contained">REGISTER</Button>
                                </Stack>
                            )
                            }
                            {   userName && userRole && (
                                <Stack sx={{ pt: 1, pb: 4 }} direction="row" spacing={2} justifyContent="center">
                                    <Button href="/" variant="contained">GO TO DASHBOARD</Button>
                                </Stack>
                            )
                            }
                        </Container>
                        <Container>
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    pt: '5%',
                                    pb: '10%'
                                }}
                                image="https://static.vecteezy.com/system/resources/previews/000/608/082/original/vector-set-of-doctor-cartoon-characters-medical-staff-team-concept.jpg"
                                alt="random"
                            />
                        </Container>
                    </Container>
                    <Typography variant="h2" align="center" color="text.primary" paragraph>
                        Other Services
                    </Typography>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {/* Card 2 */}
                        <Grid xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', margin: 2, cursor: 'pointer' }} 
                                onClick={ () => {
                                    if(!userName || !userRole){
                                        // not logged in user
                                        navigate('/mentalcheck');
                                    }else{
                                        // logged in user
                                        navigate('/user/mentalcheck');
                                    }
                                }}
                                >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        // 16:9
                                        pt: '10%'
                                    }}
                                    
                                    image="https://www.kindpng.com/picc/m/76-762055_psychology-clipart-psychosocial-mental-health-black-and-white.png"
                                    alt="mentalhealth"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        MindOasis
                                    </Typography>
                                    <Typography>
                                        Take care of your Mental Health. Fill a form which contains questions related to your everyday life,
                                        work environment, stress. Get your Mental Health Score and Mental Health Specialist will be
                                        recommended.
                                    </Typography>
                                </CardContent>
                                {/* <CardActions>
                                    <Button size="small">View</Button>
                                </CardActions> */}
                            </Card>
                        </Grid>
                        {/* card 2 */}
                        <Grid xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', margin: 2, cursor: 'pointer' }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        // 16:9
                                        pt: '10%'
                                    }}
                                    image="https://static.vecteezy.com/system/resources/previews/008/015/827/original/of-virus-icon-disease-symbol-free-vector.jpg"
                                    alt="disease prediction"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        RiskAssess
                                    </Typography>
                                    <Typography>
                                        Predict Diseases such as Cancer, Diabetes, Heart, Liver and Kidney Problem. Download the report and
                                        book appointment with our doctors.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {/*<Button size="small">View</Button>
                                    <Button size="small">Edit</Button>*/}
                                </CardActions>
                            </Card>
                        </Grid>
                        {/* card 3 */}
                        <Grid xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', margin: 2, cursor: 'pointer' }}
                            onClick={ () => {
                                // console.log(url);
                                window.location.href = medURL;
                            }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        // 16:9
                                        pt: '10%'
                                    }}
                                    image="https://static.vecteezy.com/system/resources/previews/010/400/963/non_2x/medicine-pills-bottle-icon-healthcare-and-medical-icon-vector.jpg"
                                    alt="AlternaFind"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        AlternaFind
                                    </Typography>
                                    <Typography>
                                        Can't afford the medicines? Find the alternate brands for the prescribed medicine and choose
                                        whichever you want.{' '}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {/*<Button size="small">View</Button>
                                    <Button size="small">Edit</Button>*/}
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Health Bridge
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    The Greatest Wealth Is Health!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}
