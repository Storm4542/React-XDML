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
    const validate = (username: string) => {
        return new Promise<string>((resolve, reject) => {
            checkUsername(username, resolve, () => {reject('unique');});
        });
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const rules = [

            {
                key: 'username', required: true, validate
            },
            {
                key: 'username', required: true, validate
            },
            {
                key: 'password', required: true, validate
            },
            {
                key: 'password', required: true, validate
            },

            {key: 'password', required: true, pattern: /^[A-Za-z0-9]+$/},
        ];

        validator(formData, rules, (errors) => {
            if (noErrors(errors)) {
                //没错
            } else {
                setErrors(errors);
            }
        });

    };
    const [errors, setErrors] = useState({});
    const transformErrors = (message: string) => {
        const list: any = {
            unique: '用户名已存在'
        };
        return list[message];
    };
    return (
        <Form value={formData}
              fields={fields}
              onSubmit={onSubmit}
              onChange={newValue => {setFormData(newValue);}}
              errors={errors}
              transformErrors={transformErrors}
              buttons={
                  <Fragment>
                      <Button type='submit'>提交</Button>
                      <Button level='important'>返回</Button>
                  </Fragment>

              }/>

    );
};
export default FormExample;


