import { useState, useEffect } from 'react';
import validate from 'validate.js';

import { Login } from '../../../../services';

const schema = {
    username: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
    },
};

interface Props {
    className?: string;
    onLogin: (token: string) => void;
}
export const SignInForm = (props: Props) => {
    const { className, onLogin, ...rest } = props;

    const [loginSuccess, loading, error, performLogin] = Login();

    const [formState, setFormState] = useState({
        isValid: false,
        values: {} as any,
        touched: {} as any,
        errors: {} as any,
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [formState.values]);

    const handleChange = event => {
        event.persist();

        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const { username, password } = formState.values;

        const token = await performLogin(username, password);
        onLogin(token);
    };

    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <form
            {...rest}
            className={clsx(classes.root, className)}
            onSubmit={handleSubmit}
        >
            <div className={classes.fields}>
                <TextField
                    error={hasError('username')}
                    fullWidth
                    helperText={
                        hasError('username')
                            ? formState.errors.username[0]
                            : null
                    }
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    value={formState.values.username || ''}
                    variant="outlined"
                />
                <TextField
                    error={hasError('password')}
                    fullWidth
                    helperText={
                        hasError('password')
                            ? formState.errors.password[0]
                            : null
                    }
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={formState.values.password || ''}
                    variant="outlined"
                />
            </div>
            <Button
                className={classes.signUpButton}
                color="secondary"
                disabled={!formState.isValid || loading}
                size="large"
                type="submit"
                variant="contained"
            >
                Sign in
            </Button>
        </form>
    );
};
