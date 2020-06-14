import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class InputDemo1 extends Component {

    inputRef = createRef();

    isOnComposition = false;

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }
    static getDerivedStateFromProps({ value }, { value: preValue }) {
        if (value !== preValue) {
            return { value };
        }
        return null;
    }

    handleComposition = evt => {
        if (evt.type === 'compositionend') {
            this.isOnComposition = false;

            // 谷歌浏览器：compositionstart onChange compositionend
            // 火狐浏览器：compositionstart compositionend onChange
            if (navigator.userAgent.indexOf('Firefox') > -1) {
                this.onChange(evt);
            }

            return;
        }

        this.isOnComposition = true;
    };

    onChange = evt => {
        if (!this.isOnComposition) {
            this.props.onChange(evt);
        }
    };

    render() {
        const commonProps = {
            onChange: this.onChange,
            onCompositionStart: this.handleComposition,
            onCompositionUpdate: this.handleComposition,
            onCompositionEnd: this.handleComposition,
        };
        return <input
            value={this.state.value}
            ref={this.inputRef}
            type="text"
            style={{ width: 300, height: 30, outline: 'none' }}
            {...commonProps}
        />
    }
}


InputDemo1.propTypes = {
    onChange: PropTypes.func
};

InputDemo1.defaultProps = {
    onChange: () => {}
};

export default InputDemo1;
