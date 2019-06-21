import * as React from 'react';
import {ReactFragment} from 'react';
import Input from '../input/input';
import {classes} from '../helpers/classes';
import './form.scss';

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
            <table className=''>
                <tbody>
                {props.fields.map(f =>
                    <tr className={classes('fui-form-tr')} key={f.name}>
                        <td className='fui-form-td'><span className='fui-form-label'>{f.label}</span></td>
                        <td className='fui-form-td'>
                            <Input className='fui-form-input'
                                   onChange={(e) => {onInputChange(f.name, e.target.value);}}
                                   value={formData[f.name]}
                                   type={f.input.type}/>
                            <div className='fui-form-error'>
                                {props.errors[f.name] ? props.errors[f.name].join('，') :
                                    <span>&nbsp;</span>}
                            </div>
                        </td>
                    </tr>
                )}
                <tr className='fui-form-tr'>
                    <td className='fui-form-td'/>
                    <td className='fui-form-td'>  {props.buttons}</td>
                </tr>
                </tbody>
            </table>

        </form>
    );
};
export default Form;
