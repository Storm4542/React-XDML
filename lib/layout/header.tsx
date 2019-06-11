import React from 'react';
import {scopedClassMaker} from '../helpers/classes';

const sc = scopedClassMaker('fui-layout');

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {

}

const Header: React.FunctionComponent<Props> = (props) => {
    const {className, ...rest} = props;
    return (
        <div className={sc('header', {extra: className})} {...rest}>
            header
        </div>
    );
};
export default Header;
