/**
 * Created by kiny on 16/10/9.
 */

import * as React from 'react';
import * as classNames from 'classnames';
import './button.scss';

export type ButtonType = 'primary' | 'default';
export type ButtonSize = 'small' | 'large' | 'tiny';


export interface IButtonProps {
    type: ButtonType,
    size: ButtonSize,
    htmlType: 'submit'| 'button'| 'reset',
}

const sizeMap = {large: 'lg', small: 'sm', tiny: 'xs'};

export default class Button extends React.Component<IButtonProps,any> {
    static propTypes = {
        type: React.PropTypes.oneOf(['primary', 'default']),
        size: React.PropTypes.oneOf(['large', 'small', 'tiny']),
        htmlType: React.PropTypes.oneOf(['submit', 'button', 'reset']),
    };

    static defaultProps = {};

    render() {

        const o = {a: 1, b: 2, c: 3};
        const {a, ...rb} = o;
        console.log(rb,'xx');

        const {type, size, className = '', htmlType, ...rs} = this.props as any;
        console.log('rs', rs, this.props.children);
        const cls = classNames({
            btn: true,
            [`btn-${type}`]: type,
            [`btn-${sizeMap[size]}`]: size
        });
        const n = `${cls} ${className}`;
        return (
            <button {...this.props} type={htmlType || 'button'} className={n}>{this.props.children}</button>
        );
    }
}
