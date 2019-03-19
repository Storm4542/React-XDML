import * as React from 'react';

interface iconProps {
    name: String;
}

const Icon: React.FunctionComponent<iconProps> = (props) => {
    return (
        <span>{props.name}</span>
    );
};

export default Icon;