import * as React from 'react';
import './importIcons';
import './icon.scss';

interface iconProps {
    name: String;
    onClick: React.MouseEventHandler<SVGElement>
}

const Icon: React.FunctionComponent<iconProps> = (props) => {
    return (
        <svg className='z-icon' onClick={props.onClick}>
            <use xlinkHref={`#${props.name}`}/>
        </svg>
    );
};

export default Icon;