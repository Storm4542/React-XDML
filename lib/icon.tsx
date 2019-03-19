import * as React from 'react';
import './importIcons';
import './icon.scss';

interface iconProps {
    name: String;
}

const Icon: React.FunctionComponent<iconProps> = (props) => {
    return (
            <svg className='z-icon'>
                <use xlinkHref={`#${props.name}`}/>
            </svg>
    );
};

export default Icon;