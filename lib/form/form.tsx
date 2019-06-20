import * as React from 'react';
import {ReactFragment} from 'react';

export interface FormValue {
    [K: string]: any
}

interface Props {
    value: FormValue;
    fields: Array<{ name: string, label: string, input: { type: string } }>;
    buttons: ReactFragment;
    onSubmit: (formData: React.FormEvent<HTMLFormElement>) => void
    onChange: (value: FormValue) => void;
    errors: { [K: string]: string[] }
}

const Form: React.FunctionComponent<Props> = (props) => {
    const formData = props.value;
    const onInputChange = (name: string, value: string) => {
        const newFormValue = {...formData, [name]: value};
        props.onChange(newFormValue);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(e);
    };
    return (
        <form onSubmit={onSubmit}>
            <div>
                {props.fields.map(f =>
                    <div key={f.name}>
                        {f.label}
                        <input onChange={(e) => {onInputChange(f.name, e.target.value);}} value={formData[f.name]}
                               type={f.input.type}/>
                        <div>{props.errors[f.name]}</div>
                    </div>
                )}
            </div>
            <div>
                {props.buttons}
            </div>
        </form>
    );
};
export default Form;
