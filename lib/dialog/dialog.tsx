import * as React from 'react';
import {Fragment, ReactFragment, ReactNode} from 'react';
import './dialog.scss';
import {Icon} from '../index';
import {scopedClassMaker} from '../helpers/classes';
import ReactDOM from 'react-dom';

interface props {
    visible: boolean,
    buttons?: React.ReactFragment,
    onClose: React.MouseEventHandler,
    clickMaskClose?: boolean
}


const scopedClass = scopedClassMaker('fui-dialog');

const Dialog: React.FunctionComponent<props> = (props) => {
    const onClickClose: React.MouseEventHandler = (e) => {props.onClose(e);};
    const onClickMask: React.MouseEventHandler = (e) => {
        if (props.clickMaskClose) {
            props.onClose(e);
        }
    };
    const dialogDom = props.visible ?
        <Fragment>
            <div onClick={onClickMask} className={scopedClass('mask')}/>
            <div className={scopedClass('')}>
                <header className={scopedClass('header')}>标题</header>
                <div onClick={onClickClose} className={scopedClass('close')}>
                    <Icon name='close'/>
                </div>
                <main className={scopedClass('main')}> {props.children}</main>
                {
                    props.buttons ? <footer className={scopedClass('footer')}>
                        {props.buttons}
                    </footer> : null
                }
            </div>
        </Fragment>
        :
        null;
    return (
        ReactDOM.createPortal(dialogDom, document.body)
    );
};
Dialog.defaultProps = {
    clickMaskClose: false
};

const modal = (content: ReactNode, buttons?: ReactFragment) => {
    const onClose = () => {
        ReactDOM.render(React.cloneElement(component, {visible: false}), div);
        ReactDOM.unmountComponentAtNode(div);
        div.remove();
    };
    const component =
        <Dialog
            onClose={onClose}
            buttons={buttons}
            visible={true}>
            {content}
        </Dialog>;

    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(component, div);
    return onClose;
};
const alert = (content: string) => {
    const button =
        <Fragment>
            <button onClick={() => close()}>OK</button>
        </Fragment>;
    const close = modal(content, button);
};

const confirm = (content: string, yes?: () => void, no?: () => void) => {
    const onYes = () => {
        close();
        yes && yes();
    };
    const onNo = () => {
        close();
        no && no();
    };
    const buttons = <Fragment>
        <button onClick={onYes}>OK</button>
        <button onClick={onNo}>CANCEL</button>
    </Fragment>;
    const close = modal(content, buttons);
};
export {alert, confirm, modal};
export default Dialog;
