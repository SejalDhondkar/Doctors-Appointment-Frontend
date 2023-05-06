// material-ui
import { Typography, Breadcrumbs, Divider, Grid, Link, Stack, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { useState, useEffect, useRef } from 'react';
import ComponentSkeleton from '../../components-overview/ComponentSkeleton';

 // ES2015 module syntax
 import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

import { getPrescription } from './api/List';
import { useNavigate, useParams } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const DocList = () => {
    const [data, setData] = useState({
        complaint: '',
        fees: '',
        prescription: '',
        remarks: '',
        doctor: [{
            firstname: '',
            lastname: ''
        }],
        doctorInfo: [{
            degree: '',
            registrationNo: '',
            specialization: '',
            clinicAddr: '',
            clinicName: ''
        }],
        patient: [{
            firstname: '',
            lastname: ''
        }],
        appointmentInfo: [{
            date: '',
            startTime: '',
            endTime: ''
        }]
    });

    const params = useParams();

    const historyId = params.historyId;

    const pdfExportComponent = useRef(null);

    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    const getTreatmentDetails = async () => {
        const data = {
            historyId
        };
        const response = await getPrescription(data);
        if (response) {
            setData(response);
            console.log(response);
        }
    };

    let navigate = useNavigate();

    useEffect(() => {
        getTreatmentDetails();
    }, []);

    return (
        <ComponentSkeleton>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Stack direction='row' justifyContent='right' spacing={1} >
                <Button
                    onClick={exportPDFWithComponent}
                    variant="contained"
                    color="primary"
                >
                    Download PDF
                </Button>
                </Stack>


                    <Stack spacing={3}>
                    <PDFExport ref={pdfExportComponent} paperSize="A4">
                                <MainCard>
                                <Stack direction='row' justifyContent='center' spacing={1} >
                                        <Typography justifyContent="center" variant="h2">Health Bridge</Typography>
                                        
                                        </Stack>
                                    <Stack direction='row' justifyContent='center' spacing={1} >
                                        <Typography justifyContent="center" variant="h3">Prescription</Typography>
                                        
                                        </Stack>
                                        <br></br>
                                        <Stack direction='row' justifyContent='center' spacing={1} >
                                        <Typography variant="h4">
                                            Dr. {data.doctor[0].firstname} {data.doctor[0].lastname} <br></br>
                                            
                                        </Typography>
                                        </Stack>
                                        <Stack direction='row' justifyContent='center' spacing={1} >
                                        <Typography variant="h5">
                                        {data.doctorInfo[0].degree}, {data.doctorInfo[0].specialization} 
                                        </Typography>
                                        </Stack>
                                        <Stack direction='row' justifyContent='center' spacing={1} >
                                        <Typography variant="h6">
                                        Reg. No. {data.doctorInfo[0].registrationNo}
                                        </Typography>
                                        </Stack>
                                        <br></br>
                                    <Grid container >
                                    
                                        <Grid item md={6}>
                                        <Stack direction='row' justifyContent='center' spacing={1} >
                                            <Typography variant="h6">Patient Name: {data.patient[0].firstname} {data.patient[0].lastname} <br></br>Clinic Name: {data.doctorInfo[0].clinicName} <br></br>Clinic Address: {data.doctorInfo[0].clinicAddr}</Typography><br></br>
                                        </Stack>
                                            
                        
                                        
                                        </Grid>
                                        <Grid item md={6}>
                                    <Stack direction='row' justifyContent='center' spacing={1} >
                                    <Typography variant="h6">Appointment Date: {data.appointmentInfo[0].date} <br></br>Time: {data.appointmentInfo[0].startTime} to {data.appointmentInfo[0].endTime}<br></br>
                                    Fees: {data.fees} </Typography>
                                    </Stack>
                                    </Grid>
                                    
                                    <br></br>
                                    <Grid item md={10}>
                                    <Stack direction='row' justifyContent='center' sx={{ml: 5}}>
                                    
                                    <Typography variant="h5">
                                    <br></br><br></br>
                                            Symptoms: {data.complaint} <br></br><br></br>
                                            Treatment: <br></br>
                                            {data.prescription.split(/[,|\n]/).map((value, index) => (<div key={index}> {value} </div>))}

                                            <br></br>

                                            Remarks: {data.remarks}
                                           

                                        </Typography>
                                    </Stack>
                                    </Grid>
                                    <Grid item md={2}></Grid>
                                    <br></br><br></br><br></br>
                                    Powered by Health Bridge
                                    </Grid>
                            </MainCard>
                            </PDFExport>
                    </Stack>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default DocList;
