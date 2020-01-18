import { useContext } from 'react';
import {
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    OutlinedInput,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { ValidationOptions } from 'react-hook-form/dist/types';
import { FormContext } from '../form';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
    },
}));

interface Props {
    name: string;
    label: string;
    autoComplete?: string;
    disabled?: boolean;
    validation?: ValidationOptions;
}

export const TextInput = (props: Props) => {
    const [labelWidth, setLabelWidth] = React.useState(0);
    const labelRef = React.useRef<HTMLLabelElement>(null);
    const { register, errors } = useContext(FormContext);

    React.useEffect(() => {
        setLabelWidth(labelRef.current!.offsetWidth);
    }, []);

    const { name, label, disabled, autoComplete, validation, ...rest } = props;

    const classes = useStyles({});

    return (
        <FormControl
            required={validation && validation.required}
            className={classes.formControl}
            disabled={disabled}
            fullWidth
            error={errors && errors[name] ? true : false}
            aria-describedby={name + '-text'}
            variant="outlined"
        >
            <InputLabel id={name + '-text'} htmlFor={name} ref={labelRef}>
                {label}
            </InputLabel>
            <OutlinedInput
                id={name}
                name={name}
                type="text"
                autoComplete={autoComplete}
                inputRef={validation ? register(validation) : register}
                labelWidth={labelWidth}
            />
            {errors && errors[name] && errors[name].message && (
                <FormHelperText>{errors[name].message}</FormHelperText>
            )}
        </FormControl>
    );
};
