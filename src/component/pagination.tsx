/**
 * Created by kiny on 16/10/9.
 */

import * as React from 'react';
import * as classNames from 'classnames';
import './pagination.scss';
import {pagination} from '../ultils/helper';

export interface IPaginationProps {
    maxPageCount: number,
    onPageChanged: Function,
    currentPage?: number,
    style?: any,
}

export default class Pagination extends React.Component<IPaginationProps,any> {
    static propTypes = {
        maxPageCount: React.PropTypes.number.isRequired,
        onPageChanged: React.PropTypes.func.isRequired,
        currentPage: React.PropTypes.number,
        style: React.PropTypes.object,
    };

    constructor(props: IPaginationProps) {
        super(props);
        this.state = {currentPage: this.props.currentPage || 1};
    }

    private onPageClick(idx: number) {
        if (idx === this.state.currentPage) return;
        this.setState({currentPage: idx}, () => this.props.onPageChanged && this.props.onPageChanged(idx));
    }

    getCurrentPageIndex = () => this.state.currentPage;

    setCurrentPageIndex(idx: number) {
        this.onPageClick(idx);
    }

    render() {
        const {maxPageCount} = this.props;
        const {currentPage} = this.state;
        const arr = pagination(currentPage, maxPageCount).map((i, idx) =>
            <button
                key={`${idx}-${i}`} disabled={i === '...'}
                onClick={() =>(typeof i === 'number') ? this.onPageClick(i) : null}
                className={classNames({'active':i === currentPage})}
            >{i}</button>
        );

        return (
            <div className="page" style={this.props.style}>
                <ul>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => this.onPageClick(this.state.currentPage - 1)}
                    >&lt;
                    </button>
                    {arr}
                    <button
                        disabled={currentPage === maxPageCount}
                        onClick={() => this.onPageClick(this.state.currentPage + 1)}
                    >&gt;
                    </button>
                </ul>
            </div>
        );
    }
}
