/**
 * Created by dz on 16/9/27.
 */
import * as ReactDOM from 'react-dom';

export function insertComponent(component: any) {
    const el = document.createElement('div');
    document.body.appendChild(el);
    ReactDOM.render(component, el);
    return el;
}

export function removeComponentByRef(ref: any) {
    const p = ref.parentNode;
    ReactDOM.unmountComponentAtNode(p);
    p.parentNode.removeChild(p);
}


export function getRect(e: Element) {
    const r = e.getBoundingClientRect();
    const width = r.width || r.right - r.left;
    const height = r.height || r.bottom - r.top;
    let {top, left, right, bottom} = r;
    return {top, left, right, bottom, width, height};
}

export function pagination(currentPageNum: number, maxPageNum: number, delta = 2) {
    const left = currentPageNum - delta;
    const right = currentPageNum + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= maxPageNum; i += 1) {
        if (i === 1 || i === maxPageNum || (i >= left && i < right)) {
            range.push(i);
        }
    }

    for (let j = 0, len = range.length; j < len; j += 1) {
        const num = range[j];
        if (l) {
            if (num - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (num - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(num);
        l = num;
    }

    return rangeWithDots;
}
