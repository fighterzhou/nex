/**
 * Created by dz on 16/10/18.
 */

import * as React from 'react';
import './button-group.scss';
import Button from "./button";

export default class ButtonGroup extends React.Component<any, any> {
    static propTypes = {
        children: React.PropTypes.arrayOf(React.PropTypes.object)
    };

    constructor(props) {
        super(props);

    }

    render() {
        const {className = ''} = this.props;
        return (
            <div {...this.props} className={`button-group ${className}`}>
                {this.props.children}
            </div>
        );
    }
}

