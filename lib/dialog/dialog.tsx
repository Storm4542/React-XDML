import * as React from 'react';
import {Fragment} from 'react';
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
                <footer className={scopedClass('footer')}>
                    {props.buttons}
                </footer>
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
const alert = (content: string) => {
    const component = <Dialog onClose={() => {
        ReactDOM.render(React.cloneElement(component, {visible: false}), div);
        ReactDOM.unmountComponentAtNode(div);
        div.remove();
    }} visible={true}>{content}</Dialog>;
    const div = document.createElement('div');
    document.body.append(div);
    ReactDOM.render(component, div);
};
const confirm = (content: string, yes?: () => void, no?: () => void) => {
    const onYes = () => {
        ReactDOM.render(React.cloneElement(component, {visible: false}), div);
        ReactDOM.unmountComponentAtNode(div);
        div.remove();
        yes && yes();
    };
    const onNo = () => {
        ReactDOM.render(React.cloneElement(component, {visible: false}), div);
        ReactDOM.unmountComponentAtNode(div);
        div.remove();
        no && no();
    };
    const component = <Dialog
        onClose={() => {
            onNo();
        }}
        visible={true}
        buttons={
            <Fragment>
                <button onClick={onYes}>OK</button>
                <button onClick={onNo}>CANCEL</button>
            </Fragment>
        }
    >{content}</Dialog>;
    const div = document.createElement('div');
    document.body.append(div);
    ReactDOM.render(component, div);
};
export {alert, confirm};
export default Dialog;
