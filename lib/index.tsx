import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from './icon';

const fn: React.MouseEventHandler = (e) => {
    console.log(e.target);
};
ReactDOM.render(<div>
        <Icon name="wechat" onClick={fn}/>
        <Icon name="alipay" onClick={fn}/></div>,
    document.getElementById('root')
);
