import * as React from 'react';
import './importIcons.js';
import './icon.scss';
import classes from './helpers/classes';

interface iconProps extends React.SVGAttributes<SVGElement> {
    name: string;
}

const Icon: React.FunctionComponent<iconProps> = ({className, name, ...restProps}) => {
    return (
        <svg className={classes('z-icon', className)}
             {...restProps}
        >
            <use xlinkHref={`#${name}`}/>
        </svg>
    );
};

export default Icon;