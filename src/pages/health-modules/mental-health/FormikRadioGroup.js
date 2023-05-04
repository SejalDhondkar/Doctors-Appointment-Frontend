import React from 'react';

import RadioGroup from '@mui/material/RadioGroup';

const FormikRadioGroup = ({ field, form: { touched, errors }, name, ...props }) => {
    const fieldName = name || field.name;

    return (
        <React.Fragment>
            <RadioGroup {...field} {...props} />
            {touched[fieldName] && errors[fieldName] && <React.Fragment>{errors[fieldName]}</React.Fragment>}
        </React.Fragment>
    );
};

export default FormikRadioGroup;
