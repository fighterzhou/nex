/**
 * Created by dz on 16/10/18.
 */

import * as React from 'react';
import {insertComponent, removeComponentByRef, getRect} from '../ultils/helper';
import './tips.scss';

export interface ITipsProps {
    content: string;
    style?: any;
    parentRef?: any;
    time?: number;
    onDisappear?: Function;
}

export class TipsWrap extends React.Component<ITipsProps, any> {
    timer: any;
    tips: any;

    static propTypes = {
        content: React.PropTypes.string.isRequired,
        parentRef: React.PropTypes.any,
        time: React.PropTypes.number,
        onDisappear: React.PropTypes.func,
    };

    componentDidMount() {
        this.layout();
        this.addTimer();
    }

    componentWillUnmount() {
        this.clearTimer()
    }

    addTimer() {
        this.timer = setTimeout(() => {
            this.close();
        }, this.props.time || 1500);
    }

    clearTimer() {
        clearTimeout(this.timer);
        this.timer = null;
    }

    layout() {
        let rect;
        if (this.props.parentRef === undefined) {
            const e = document.documentElement;
            rect = {left: 0, top: 0, width: e.clientWidth, height: e.clientHeight};
        } else {
            rect = getRect(this.props.parentRef);
        }
        const r = getRect(this.tips);
        const left = rect.left + ((rect.width - r.width) / 2);
        const top = rect.top + ((rect.height - r.height) / 2);
        const style = `top:${top}px;left:${left}px;`;
        this.tips.setAttribute('style', (this.tips.getAttribute('style') || '') + style);
    }

    close() {
        this.props.onDisappear && this.props.onDisappear();
        removeComponentByRef(this.tips);
    }

    render() {
        return (
            <div ref={(ref) => { this.tips = ref; }} className="tips" style={this.props.style}>
                {this.props.content}
            </div>
        );
    }
}

export default class Tips extends TipsWrap {
    /**
     * 显示Tips
     * @param param
     * @param ref
     */
    static show(param: ITipsProps|string, ref: any = undefined) {
        if (typeof param === 'object') {
            insertComponent(<TipsWrap {...param} parentRef={ref} />);
        } else if (typeof param === 'string') {
            insertComponent(<TipsWrap content={param} parentRef={ref} />);
        }
    }
}
