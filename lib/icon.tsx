import * as React from 'react';
import './importIcons';

interface iconProps {
    name: String;
}

const Icon: React.FunctionComponent<iconProps> = (props) => {
    return (
        <span>
            <svg>
                <use xlinkHref={`#${props.name}`}/>
            </svg>
        </span>
    );
};

export default Icon;