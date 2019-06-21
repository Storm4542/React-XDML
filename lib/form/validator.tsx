import {FormValue} from './form';

interface FormRule {
    key: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;
    validator?: {
        name: string,
        validate: (value: any) => Promise<any>
    }
}

interface OneError {
    message: string;
    promise?: Promise<any>
}

type FormRules = Array<FormRule>;

function isEmpty(value: any) {
    return value === undefined || value === null || value === '';

}

export function noErrors(errors: any) {
    return Object.keys(errors).length === 0;
}


const validator = (formValue: FormValue, rules: FormRules, callback: (errors: any) => void) => {
    let errors: any = {};
    const addError = (key: string, error: OneError) => {
        if (errors[key] === undefined) {
            errors[key] = [];
        }
        errors[key].push(error);
    };
    rules.map(rule => {
        const value = formValue[rule.key];
        if (rule.validator) {
            const promise = rule.validator.validate(value);
            addError(rule.key, {message: '用户名已存在', promise});
        }
        if (rule.required && isEmpty(value)) {
            addError(rule.key, {message: '必填'});
            return;
        }
        if (rule.maxLength) {
            if (!isEmpty(value) && value.length > rule.maxLength) {
                addError(rule.key, {message: '太长'});
                return;
            }
        }
        if (rule.minLength) {
            if (!isEmpty(value) && value.length < rule.minLength) {
                addError(rule.key, {message: '太短'});
                return;
            }
        }
        if (rule.pattern) {
            if (!(rule.pattern.test(value))) {
                addError(rule.key, {message: '不符合规则'});
                return;
            }
        }

    });
    const myPromises = flat(Object.values(errors)).filter(item => item.promise).map(item => item.promise);
    console.log(Object.keys(errors), errors);
    Promise.all(myPromises).then(() => {
        const newErrors = fromEntries(
            Object.keys(errors).map<[string, string[]]>(key =>
                [key, errors[key].map((item: OneError) => item.message)]
            )
        );
        callback(newErrors);
    }, () => {
        const newErrors = fromEntries(
            Object.keys(errors).map<[string, string[]]>(key =>
                [key, errors[key].map((item: OneError) => item.message)]
            )
        );
        callback(newErrors);
    });
};
export default validator;

function flat(array: Array<any>) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] instanceof Array) {
            result.push(...array[i]);
        } else {
            result.push(array[i]);
        }
    }
    return result;
}

function fromEntries(array: Array<[string, string[]]>) {
    let result: any = {};
    for (let i = 0; i < array.length; i++) {
        result[array[i][0]] = array[i][1];
    }
    return result;
}
