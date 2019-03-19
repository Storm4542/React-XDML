import * as React from 'react';
import './importIcons.js';
import './icon.scss';
import classes from './helpers/classes';

interface iconProps extends React.SVGAttributes<SVGElement> {
    name: string;
}

const Icon: React.FunctionComponent<iconProps> = (props) => {
    const {className, ...restProps} = props;

    return (
        <svg className={classes('z-icon', className)}
             {...restProps}
        >
            <use xlinkHref={`#${props.name}`}/>
        </svg>
    );
};

export default Icon;