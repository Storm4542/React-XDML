import React from 'react';
import {scopedClassMaker} from '../helpers/classes';

const sc = scopedClassMaker('fui-layout');

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {

}

const Aside: React.FunctionComponent<Props> = (props) => {
    const {className, ...rest} = props;
    return (
        <div className={sc('aside', {extra: className})} {...rest}>
            aside
        </div>
    );
};
export default Aside;