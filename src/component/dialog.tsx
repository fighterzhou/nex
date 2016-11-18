/**
 * Created by dz on 16/10/18.
 */

import * as React from 'react';
import {insertComponent, removeComponentByRef, getRect} from '../ultils/helper';
import './dialog.scss';
import Button from "./button";
import Icon from "./icon/icon";
import ButtonGroup from "./button-group";

export interface IDialogProps {
    title: string;
    children: any;
    isShow: boolean;
    onCancel: Function;
    confirmText: string,
    cancelText: string,
    modal: boolean;
    footer: any;
}

export default class Dialog extends React.Component<IDialogProps, any> {
    dialogRef: any;

    static confirmText: string = 'OK';
    static cancelText: string = 'Cancel';

    constructor(props: IDialogProps) {
        super(props);
        this.state = {isShow: props.isShow};
    }

    static setGlobalProps(obj) {

    }

    static defaultProps = {
        isShow: true,
        confirmText: Dialog.confirmText,
        cancelText: Dialog.cancelText,
        modal: false,
    };

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        children: React.PropTypes.any.isRequired,
        onCancel: React.PropTypes.func,
        confirmText: React.PropTypes.string,
        cancelText: React.PropTypes.string,
        modal: React.PropTypes.bool,
        footer: React.PropTypes.any,
    };

    /**
     * asfasdf
     * @param obj
     */
    static showAlert(obj: IDialogProps) {
        insertComponent(<Dialog {...obj}>{obj.children}</Dialog>);
    }

    componentDidMount() {
        this.layout();
        window.addEventListener('resize', this.layout);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.layout);
    }

    private layout = () => {
        const e = document.documentElement;
        const rect = {left: 0, top: 0, width: e.clientWidth, height: e.clientHeight};
        const r = getRect(this.dialogRef);
        const left = rect.left + ((rect.width - r.width) / 2);
        const top = rect.top + ((rect.height - r.height) / 2);
        const style = `top:${top}px;left:${left}px;`;
        this.dialogRef.setAttribute('style', style);
    };

    close = () => {
        // this.props.onDisappear && this.props.onDisappear();
        this.setState({isShow: false});
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        // removeComponentByRef(this.dialogRef);
    };

    renderFooter() {
        const {confirmText, cancelText, footer} = this.props;
        if (footer) return footer;
        return (
            <ButtonGroup>
                <Button className="btn btn-default" onClick={this.close}>{cancelText}</Button>
                <Button className="btn btn-info">{confirmText}</Button>
            </ButtonGroup>
        );
    }

    render() {
        const {title, children, modal} = this.props;
        return (
            <div style={{display: this.state.isShow ? 'block' : 'none' }}>
                <div className="overlay" onClick={modal ? null : this.close} />
                <div className="dialog" ref={(ref) => { this.dialogRef = ref; }}>
                    <h3 className="title">
                        {title}
                        <Button className="btn btn-blank close-btn" onClick={this.close}>
                            <Icon className="fa close" />
                        </Button>
                    </h3>
                    <div className="content">
                        <div className="cell">{children}</div>
                    </div>
                    <div className="footbar">
                        {this.renderFooter()}
                    </div>
                </div>
            </div>
        );
    }
}
