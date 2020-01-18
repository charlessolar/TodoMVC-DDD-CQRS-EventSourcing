import { createContext } from 'react';
import useForm, { FormContext as ReactHookFormContext } from 'react-hook-form';
import {
    FormState,
    OnSubmit,
    FieldError,
    Validate,
    NameProp,
    ElementLike,
    FieldName,
    FieldValues,
} from 'react-hook-form/dist/types';

import { Alert } from 'components';

export const FormContext = createContext(null as {
    loading: boolean;
    serverError: boolean;
    errors: Partial<Record<string, FieldError>>;
    formState: FormState;
    triggerValidation: Function;
    setError: (
        name: FieldName<FieldValues>,
        type: string,
        message?: string | undefined,
        ref?: any
    ) => void;
    setValue: <Name extends FieldName<FieldValues>>(
        name: Name,
        value: FieldValues[Name],
        shouldValidate?: boolean | undefined
    ) => void | Promise<boolean>;
    getValue: <Name extends FieldName<FieldValues>>(
        name: Name
    ) => FieldValues[Name];
    register: {
        <Element_1>(
            validateRule: Partial<{
                required: string | boolean;
                min:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                max:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                maxLength:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                minLength:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                pattern:
                    | RegExp
                    | {
                          value: RegExp;
                          message: string;
                      };
                validate:
                    | Validate
                    | Record<string, Validate>
                    | {
                          value: Validate | Record<string, Validate>;
                          message: string;
                      };
            }> &
                NameProp
        ): (ref: Element_1 | null) => void;
        <Element_2 extends ElementLike = ElementLike>(
            validateRule: Partial<{
                required: string | boolean;
                min:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                max:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                maxLength:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                minLength:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                pattern:
                    | RegExp
                    | {
                          value: RegExp;
                          message: string;
                      };
                validate:
                    | Validate
                    | Record<string, Validate>
                    | {
                          value: Validate | Record<string, Validate>;
                          message: string;
                      };
            }>
        ): (ref: Element_2 | null) => void;
        <Element_3>(
            ref: Element_3 | null,
            validateRule: Partial<{
                required: string | boolean;
                min:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                max:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                maxLength:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                minLength:
                    | string
                    | number
                    | {
                          value: string | number;
                          message: string;
                      };
                pattern:
                    | RegExp
                    | {
                          value: RegExp;
                          message: string;
                      };
                validate:
                    | Validate
                    | Record<string, Validate>
                    | {
                          value: Validate | Record<string, Validate>;
                          message: string;
                      };
            }> &
                NameProp
        ): void;
        <Element_4 extends ElementLike = ElementLike>(
            ref: Element_4 | null,
            validationOptions?:
                | Partial<{
                      required: string | boolean;
                      min:
                          | string
                          | number
                          | {
                                value: string | number;
                                message: string;
                            };
                      max:
                          | string
                          | number
                          | {
                                value: string | number;
                                message: string;
                            };
                      maxLength:
                          | string
                          | number
                          | {
                                value: string | number;
                                message: string;
                            };
                      minLength:
                          | string
                          | number
                          | {
                                value: string | number;
                                message: string;
                            };
                      pattern:
                          | RegExp
                          | {
                                value: RegExp;
                                message: string;
                            };
                      validate:
                          | Validate
                          | Record<string, Validate>
                          | {
                                value: Validate | Record<string, Validate>;
                                message: string;
                            };
                  }>
                | undefined
        ): void;
    };
});

interface Props {
    loading: boolean;
    error: boolean;
    onSubmit: OnSubmit<Record<string, any>>;
    children: JSX.Element | JSX.Element[];
}

export const Form = (props: Props) => {
    const { loading, error, onSubmit, children } = props;

    const methods = useForm({ mode: 'onBlur' });

    const getValue = <Name extends FieldName<FieldValues>>(name: Name) => {
        return methods.getValues()[name];
    };

    return (
        <ReactHookFormContext {...methods}>
            <FormContext.Provider
                value={{
                    formState: methods.formState,
                    errors: methods.errors,
                    register: methods.register,
                    setError: methods.setError,
                    setValue: methods.setValue,
                    triggerValidation: methods.triggerValidation,
                    getValue,
                    serverError: error,
                    loading,
                }}
            >
                {error && (
                    <Alert
                        message="Error communicating with server"
                        variant="error"
                    />
                )}
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </FormContext.Provider>
        </ReactHookFormContext>
    );
};
