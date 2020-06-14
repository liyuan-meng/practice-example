import React, { Component, createRef } from 'react';
import { createPopper } from '@popperjs/core/lib/popper-lite';
import './index.css';

export default class TestPopper extends Component {
    ref = createRef();

    state = { isShowTooltip: false };

    popcorn = null;

    tooltip = null;

    componentDidMount() {
        window.addEventListener('mouseover', this.togglePanel);
    }

    componentWillUnmount() {
        window.removeEventListener('mouseover', this.togglePanel);
    }

    onHover = () => {
        this.setState({ isShowTooltip: true });
        this.popcorn = this.ref.current.querySelector('#popcorn');
        this.tooltip = this.ref.current.querySelector('#tooltip');
        createPopper(this.popcorn, this.tooltip, {
            placement: 'top-start',
            strategy: 'fixed',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 10],
                    },
                },
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['top-start', 'bottom-start'],
                    },
                },
            ],
        });
    };

    onMouseLeave = () => {
        this.setState({ isShowTooltip: false });
    };

    getCoordinate = className => {
        if (!this.ref.current) return {};

        const btnEle = this.ref.current.querySelector(className);
        if (!btnEle) return {};

        const { x, y, width, height } = btnEle.getBoundingClientRect();
        return {
            x1: x,
            x2: x + width,
            y1: y,
            y2: y + height
        };
    };

    isInsideReact = (target, rect) => {
        const { x, y } = target;
        const { x1, x2, y1, y2 } = rect;
        return x >= x1 && x <= x2 && y >= y1 - 6 && y <= y2 + 6;
    };

    togglePanel = evt => {
        const btnCoordinate = this.getCoordinate('#popcorn');
        const panelCoordinate = this.getCoordinate('#tooltip');
        // const tableCoordinate = this.getCoordinate('.table-wrap');
        if (this.isInsideReact(evt, btnCoordinate)) return;
        this.setState({ isShowTooltip: this.isInsideReact(evt, panelCoordinate) });
    };

    render() {
        return (
            <div className="tooltip-button" ref={this.ref}>
                <div id="popcorn" onMouseOver={this.onHover}>{this.props.children}</div>
                <div id="tooltip" onMouseLeave={this.onMouseLeave} style={{ display: this.state.isShowTooltip ? 'block' : 'none' }}>
                    <div style={{ maxHeight: 50, overflow: 'auto' }}>
                        {this.props.content}
                    </div>
                </div>
            </div>
        )
    }
}
