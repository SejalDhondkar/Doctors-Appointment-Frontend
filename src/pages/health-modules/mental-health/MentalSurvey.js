import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import FormikRadioGroup from './FormikRadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import './mentalstyle.css';

 


const MentalSurvey = () => {

const validateForm = (values) => {
        let errors = {};
        if (values.radioGroup === '') {
            errors.radioGroup = 'You must select a value.';
        }
        return errors;
    };

const navigate = useNavigate();
    
return (
    <>
        <Formik
            initialValues={{
                mentalHealthRating: '',
                probWithWork: '',
                lastHappy: '',
                lastGood: '',
                outlook: '',
                feelPositive: '',
                probWithSleep: '',
                emo: '',
                affect:'',
                feel: ''
            }}
            validate={validateForm}
            onSubmit={(values) => {
                navigate('/mentalresult', {
                    state: {
                        values
                    }
                });
            }}
            render={({ values }) => (
                <Form className="container">
                    <h1 className="heading">Online Mental Health Screening</h1>
                    <Field className="field" name="mentalHealthRating" component={FormikRadioGroup}>
                        <div className="question">Overall how would you rate your mental health?</div>
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="90" data-testid="radio" />}
                            label="Excellent"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="75" data-testid="radio" />}
                            label="Somewhat Good"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="60" data-testid="radio" />}
                            label="Average"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="40" data-testid="radio" />}
                            label="Somewhat Poor"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="30" data-testid="radio" />}
                            label="Poor"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="50" data-testid="radio" />}
                            label="Not Sure"
                            labelPlacement="end"
                        />
                    </Field>
                    <Field className="field" name="probWithWork" component={FormikRadioGroup}>
                        <div className="question">
                            During the past 4 weeks, have you had any problems with your work or daily life due to any emotional problems,
                            such as feeling depressed, sad or anxious?
                        </div>
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="30" data-testid="radio" />}
                            label="Yes"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="90" data-testid="radio" />}
                            label="No"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="60" data-testid="radio" />}
                            label="Not Sure"
                            labelPlacement="end"
                        />
                    </Field>
                    <Field className="field" name="lastHappy" component={FormikRadioGroup}>
                        <div className="question">When was the last time you were really happy?</div>
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="80" data-testid="radio" />}
                            label="Few days ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="70" data-testid="radio" />}
                            label="Few weeks ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="50" data-testid="radio" />}
                            label="Few months ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="40" data-testid="radio" />}
                            label="Few years ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="30" data-testid="radio" />}
                            label="I don't remember"
                            labelPlacement="end"
                        />
                    </Field>
                    <Field className="field" name="lastGood" component={FormikRadioGroup}>
                        <div className="question">When was the last time you felt good about yourself?</div>
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="80" data-testid="radio" />}
                            label="Few days ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="70" data-testid="radio" />}
                            label="Few weeks ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="50" data-testid="radio" />}
                            label="Few months ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="40" data-testid="radio" />}
                            label="Few years ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="30" data-testid="radio" />}
                            label="I don't remember"
                            labelPlacement="end"
                        />
                    </Field>
                    <Field className="field" name="outlook" component={FormikRadioGroup}>
                        <div className="question">When was the last time you had a positive outlook on life?</div>
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="80" data-testid="radio" />}
                            label="Few days ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="70" data-testid="radio" />}
                            label="Few weeks ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="50" data-testid="radio" />}
                            label="Few months ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="40" data-testid="radio" />}
                            label="Few years ago"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="30" data-testid="radio" />}
                            label="I don't remember"
                            labelPlacement="end"
                        />
                    </Field>
                    <Field className="field" name="feelPositive" component={FormikRadioGroup}>
                        <div className="question">How often do you feel positive about your life?</div>
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="30" data-testid="radio" />}
                            label="Never"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="40" data-testid="radio" />}
                            label="Once in a while"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="60" data-testid="radio" />}
                            label="About half the time"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="80" data-testid="radio" />}
                            label="Most of the time"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="90" data-testid="radio" />}
                            label="Always"
                            labelPlacement="end"
                        />
                    </Field>
                    <Field className="field" name="probWithSleep" component={FormikRadioGroup}>
                        <div className="question">Do you have trouble falling asleep, staying asleep or sleeping too much?</div>
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="30" data-testid="radio" />}
                            label="Yes"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="90" data-testid="radio" />}
                            label="No"
                            labelPlacement="end"
                        />
                    </Field>
                    <Field className="field" name="emo" component={FormikRadioGroup}>
                        <div className="question">Do you often get affected emotionally easily?</div>
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="30" data-testid="radio" />}
                            label="Yes"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="70" data-testid="radio" />}
                            label="No"
                            labelPlacement="end"
                        />
                    </Field>
                    <Field className="field" name="affect" component={FormikRadioGroup}>
                        <div className="question">
                            Do you ever feel that you’ve been affected by feelings of edginess, anxiety, or nerves?
                        </div>
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="30" data-testid="radio" />}
                            label="Yes"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="70" data-testid="radio" />}
                            label="No"
                            labelPlacement="end"
                        />
                    </Field>
                    <Field className="field" name="feel" component={FormikRadioGroup}>
                        <div className="question">Which kind of feeling have you experienced the most?</div>
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="30" data-testid="radio" />}
                            label="Depression and Anxiety"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="40" data-testid="radio" />}
                            label="Inadequacy about your life or appearance"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="50" data-testid="radio" />}
                            label="FOMO"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="45" data-testid="radio" />}
                            label="Isolated"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            control={<Radio id="radioGroup" value="90" data-testid="radio" />}
                            label="Positive and Energetic"
                            labelPlacement="end"
                        />
                    </Field>

                    <div className="activation-buttons">
                        <Button color="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        />
    </>
);
};
    export default MentalSurvey;
