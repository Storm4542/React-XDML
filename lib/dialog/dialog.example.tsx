import React, {useState, Fragment} from 'react';
import Dialog, {alert, confirm} from './dialog';

export default function () {
    const [x, setX] = useState(false);
    return (
        <div>
            <h1>EXAMPLE 1</h1>
            <Dialog visible={x}
                    buttons={
                        <Fragment>
                            <button onClick={() => {setX(false);}}>OK</button>
                            <button onClick={() => {setX(false);}}>CANCEL</button>
                        </Fragment>
                    }
                    onClose={() => {setX(false);}}
                    clickMaskClose={true}>
                我是内容
            </Dialog>
            <button onClick={() => {setX(!x);}}>dialog</button>
            <h1>EXAMPLE 2</h1>
            <Dialog visible={x}
                    buttons={
                        <Fragment>
                            <button onClick={() => {setX(false);}}>OK</button>
                            <button onClick={() => {setX(false);}}>CANCEL</button>
                        </Fragment>
                    }
                    onClose={() => {setX(false);}}
                    clickMaskClose={true}>
                我是内容
            </Dialog>
            <button onClick={() => {alert('1');}}>dialog</button>
            <button onClick={() => {confirm('1', () => {console.log('yes');}, () => {console.log('no');});}}>confirm
            </button>

        </div>
    );
}
