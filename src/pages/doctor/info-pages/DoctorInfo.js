// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

import { useState, useEffect } from 'react';

// project import
import ComponentSkeleton from '../../components-overview/ComponentSkeleton';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { getDoctorInfo, addDoctorInfo } from '../api/info';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const DoctorInfo = () => {
    const [docInfo, setDocInfo] = useState({
        degree: '',
        college: '',
        experience: '',
        specialization: '',
        registrationNo: '',
        clinicName: '',
        clinicAddr: '',
        startTime: '',
        endTime: '',
        timePerSlot: '',
        firstFees: '',
        followupFees: ''
    });

    const [reg, setReg] = useState('');
    // const initialValues = {
    //     degree: '',
    //     college: '',
    //     experience: '',
    //     specialization: '',
    //     registrationNo: '',
    //     submit: null
    // };

    let navigate = useNavigate();

    const handleDocSubmit = async (values) => {
        const response = await addDoctorInfo(values);
        console.log(response);
        if (response) {
            navigate('/details');
        }
    };

    const getDocDetails = async () => {
        const response = await getDoctorInfo();
        // console.log(response.degree);
        if (response) {
            // setDocInfo(response.data);
            // initialValues.degree = response.degree;
            // console.log(initialValues.degree);
            // initialValues.college = response.college;
            // console.log(initialValues.college);
            // initialValues.experience = response.experience;
            // initialValues.specialization = response.specialization;
            // initialValues.registrationNo = response.registrationNo;
            // setReg(response.registrationNo);
            setDocInfo({
                degree: response.degree,
                college: response.college,
                experience: response.experience,
                specialization: response.specialization,
                registrationNo: response.registrationNo,
                clinicName: response.clinicName,
                clinicAddr: response.clinicAddr,
                startTime: response.startTime,
                timePerSlot: response.timePerSlot,
                endTime: response.endTime,
                firstFees: response.firstFees,
                followupFees: response.followupFees
            });
            // initialValues = {
            //     degree: response.degree,
            //     college: response.college,
            //     experience: response.experience,
            //     specialization: response.specialization,
            //     registrationNo: response.registrationNo,
            //     submit: null
            // };
        }
    };

    useEffect(() => {
        getDocDetails();
    }, []);

    return (
        <ComponentSkeleton>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Formik
                        enableReinitialize
                        initialValues={docInfo}
                        validationSchema={Yup.object().shape({
                            degree: Yup.string().max(255).required('Field is required'),
                            experience: Yup.string().max(255).required('Field is required'),
                            registrationNo: Yup.string().max(255).required('Field is required')
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                handleDocSubmit(values);
                                console.log(values);
                                setStatus({ success: false });
                                setSubmitting(false);
                            } catch (err) {
                                console.error(err);
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <MainCard title="Doctor Details">
                                    <Stack spacing={0.75} sx={{ mt: -1.5 }}></Stack>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="firstname-signup">Degree</InputLabel>
                                                <OutlinedInput
                                                    id="firstname-login"
                                                    type="firstname"
                                                    value={values.degree}
                                                    name="degree"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="MBBS"
                                                    fullWidth
                                                    error={Boolean(touched.degree && errors.degree)}
                                                />
                                                {touched.degree && errors.degree && (
                                                    <FormHelperText error id="helper-text-firstname-signup">
                                                        {errors.degree}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="firstname-signup">Specialization</InputLabel>
                                                <OutlinedInput
                                                    id="firstname-login"
                                                    type="firstname"
                                                    value={values.specialization}
                                                    name="specialization"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Cardiologist"
                                                    fullWidth
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="company-signup">College Name</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    id="company-signup"
                                                    value={values.college}
                                                    name="college"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="GMC Nagpur"
                                                    inputProps={{}}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="company-signup">Experience (in yrs)</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    id="company-signup"
                                                    value={values.experience}
                                                    name="experience"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Demo Inc."
                                                    inputProps={{}}
                                                    error={Boolean(touched.experience && errors.experience)}
                                                />
                                                {touched.experience && errors.experience && (
                                                    <FormHelperText error id="helper-text-company-signup">
                                                        {errors.experience}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="company-signup">Registration Number</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={Boolean(touched.phone && errors.phone)}
                                                    id="company-signup"
                                                    value={values.registrationNo}
                                                    name="registrationNo"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder=""
                                                    inputProps={{}}
                                                />
                                                {touched.registrationNo && errors.registrationNo && (
                                                    <FormHelperText error id="helper-text-company-signup">
                                                        {errors.registrationNo}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                                <br></br>
                                <MainCard title="Clinic Details">
                                    <Stack spacing={0.75} sx={{ mt: -1.5 }}></Stack>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="firstname-signup">Clinic Name</InputLabel>
                                                <OutlinedInput
                                                    id="firstname-login"
                                                    type="firstname"
                                                    value={values.clinicName}
                                                    name="clinicName"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="MBBS"
                                                    fullWidth
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="firstname-signup">Clinic Address</InputLabel>
                                                <OutlinedInput
                                                    id="firstname-login"
                                                    type="firstname"
                                                    value={values.clinicAddr}
                                                    name="clinicAddr"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Cardiologist"
                                                    fullWidth
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="company-signup">First Fees</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    id="company-signup"
                                                    value={values.firstFees}
                                                    name="firstFees"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder=""
                                                    inputProps={{}}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="company-signup">Follow Up Fees</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    id="company-signup"
                                                    value={values.followupFees}
                                                    name="followupFees"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder=""
                                                    inputProps={{}}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="company-signup">Start Time</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    id="company-signup"
                                                    value={values.startTime}
                                                    name="startTime"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="GMC Nagpur"
                                                    inputProps={{}}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="company-signup">End Time</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    id="company-signup"
                                                    value={values.endTime}
                                                    name="endTime"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Demo Inc."
                                                    inputProps={{}}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="company-signup">Time Per Slot</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    id="company-signup"
                                                    value={values.timePerSlot}
                                                    name="timePerSlot"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder=""
                                                    inputProps={{}}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                                <br></br>
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Save Details
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default DoctorInfo;
