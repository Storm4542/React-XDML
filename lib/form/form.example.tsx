import * as React from 'react';
import Form, {FormValue} from './form';
import {Fragment, useState} from 'react';
import validator from './validator';


const FormExample: React.FunctionComponent = () => {
    const [formData, setFormData] = useState<FormValue>({
        username: '',
        password: ''
    });
    const [fields] = useState([
        {name: 'username', label: '用户名', input: {type: 'text'}},
        {name: 'password', label: '密码', input: {type: 'password'}}
    ]);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const rules = [
            {key: 'username', required: true},
            {key: 'username', required: true, maxLength: 12, minLength: 6},
            {key: 'username', required: true, pattern: /^[A-Za-z0-9]+$/},
            {key: 'password', required: true, pattern: /^[A-Za-z0-9]+$/},
        ];
        const formError = validator(formData, rules);
        setErrors(formError);
    };
    const [errors, setErrors] = useState({});
    return (
        <Form value={formData}
              fields={fields}
              onSubmit={onSubmit}
              onChange={newValue => {setFormData(newValue);}}
              errors={errors}
              buttons={
                  <Fragment>
                      <button type='submit'>提交</button>
                      <button>返回</button>
                  </Fragment>

              }/>

    );
};
export default FormExample;
