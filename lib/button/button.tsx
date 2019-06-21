import * as React from 'react';
import {ButtonHTMLAttributes} from 'react';
import {classes} from '../helpers/classes';
import './button.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    level?: 'important' | 'danger' | 'default'
}

const Button: React.FunctionComponent<Props> = (props) => {
    const {className, level, children, ...rest} = props;
    return (
        <button {...rest}
                className={classes('fui-button', `fui-button-${level}`, className)}>
            {children}
        </button>
    );
};
Button.defaultProps = {
    level: 'default'
};
export default Button;
