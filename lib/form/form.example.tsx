import * as React from 'react';
import Form, {FormValue} from './form';
import {Fragment, useState} from 'react';
import validator, {noErrors} from './validator';
import Button from '../button/button';

const USERS = ['frank', 'amy', 'maybe'];
const checkUsername = (username: string, success: () => void, fail: () => void) => {
    setTimeout(() => {
        if (USERS.indexOf(username) >= 0) {
            fail();
        } else {
            success();
        }
    }, 1000);
};

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

            {
                key: 'username', validator: {
                    name: 'username',
                    validate(username: string) {
                        console.log('有人调用validator');
                        return new Promise((resolve, reject) => {
                            checkUsername(username, resolve, reject);
                        });
                    }
                }
            },

            {key: 'password', required: true, pattern: /^[A-Za-z0-9]+$/},
        ];
        validator(formData, rules, (errors) => {
            console.log(errors);
            if (noErrors(errors)) {
                //没错
            } else {
                setErrors(errors);
            }
        });

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
                      <Button type='submit'>提交</Button>
                      <Button level='important'>返回</Button>
                  </Fragment>

              }/>

    );
};
export default FormExample;


