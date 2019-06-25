import {FormValue} from './form';


interface FormRule {
    key: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;
    validate?: (value: any) => Promise<string>

}

type OneError = string | Promise<any>
type FormRules = Array<FormRule>;

function isEmpty(value: any) {
    return value === undefined || value === null || value === '';

}

export function noErrors(errors: any) {
    return Object.keys(errors).length === 0;
}


const validator = (formValue: FormValue, rules: FormRules, callback: (errors: any) => any) => {
    let errors: any = {};
    const addError = (key: string, error: OneError) => {
        if (errors[key] === undefined) {
            errors[key] = [];
        }
        errors[key].push(error);
    };
    rules.map(rule => {
        const value = formValue[rule.key];
        if (rule.validate) {
            const promise = rule.validate(value);
            addError(rule.key, promise);
        }
        if (rule.required && isEmpty(value)) {
            addError(rule.key, 'required');
            return;
        }
        if (rule.maxLength) {
            if (!isEmpty(value) && value.length > rule.maxLength) {
                addError(rule.key, 'maxLength');
                return;
            }
        }
        if (rule.minLength) {
            if (!isEmpty(value) && value.length < rule.minLength) {
                addError(rule.key, 'minLength');
                return;
            }
        }
        if (rule.pattern) {
            if (!(rule.pattern.test(value))) {
                addError(rule.key, 'pattern');
                return;
            }
        }

    });

    const kvErrors = Object.keys(errors).map(key =>
        errors[key].map((promise: any) => [key, promise])  //[ [[username:promise1], [username:promise2]],[password:promise]]
    );
    const flatErrors = flat(kvErrors); // [[username:promise1],[username:promise2],[password:promise]]
    const promiseErrors = flatErrors.map(([key, promiseOrString]) => (
        promiseOrString instanceof Promise ? promiseOrString : Promise.reject(promiseOrString)).then(() => {
            return [key, undefined];
        },
        (reason: string) => {
            return [key, reason];
        })); //[promise,promise,promise]

    Promise.all(promiseErrors).then(res => callback(zip(res.filter(item => item[1]))));
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

// [[1:2],[3,4]] => {1:2,3:4}
function zip(kvList: Array<any>) {
    let result: any = {};
    kvList.map(([key, value]) => {
        result[key] = result[key] || [];
        result[key].push(value);
    });
    return result;
}
