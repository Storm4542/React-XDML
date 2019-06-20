import {FormValue} from './form';

interface FormRule {
    key: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;
}

interface FormError {
    [K: string]: string[]
}

type FormRules = Array<FormRule>;

function isEmpty(value: any) {
    return value === undefined || value === null || value === '';

}

const validator = (formValue: FormValue, rules: FormRules): FormError => {
    let errors: any = {};
    const addError = (key: string, message: string) => {
        if (errors[key] === undefined) {
            errors[key] = [];
        }
        errors[key].push(message);
    };
    rules.map(rule => {
        const value = formValue[rule.key];
        if (rule.required && isEmpty(value)) {
            addError(rule.key, '必填');
        }
        if (rule.maxLength) {
            if (!isEmpty(value) && value.length > rule.maxLength) {
                addError(rule.key, '太长');
            }
        }
        if (rule.minLength) {
            if (!isEmpty(value) && value.length < rule.minLength) {
                addError(rule.key, '太短');
            }
        }
        if (rule.pattern) {
            if (!(rule.pattern.test(value))) {
                addError(rule.key, '不符合规则');
            }
        }

    });
    return errors;
};
export default validator;
