import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class InputDemo extends Component {

    inputRef = createRef();

    isOnComposition = false;

    componentDidMount() {
        this.setInputValue();
    }

    componentDidUpdate() {
        this.setInputValue();
    }

    setInputValue = () => {
        this.inputRef.current.value = this.props.value || ''
    };

    handleComposition = evt => {
        if (evt.type === 'compositionend') {
            this.isOnComposition = false;

            // 谷歌浏览器：compositionstart onChange compositionend
            // 火狐浏览器：compositionstart compositionend onChange
            if (navigator.userAgent.indexOf('Chrome') > -1) {
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
            ref={this.inputRef}
            type="text"
            style={{ width: 300, height: 30, outline: 'none' }}
            {...commonProps}
        />
    }
}

InputDemo.propTypes = {
    onChange: PropTypes.func
};

InputDemo.defaultProps = {
    onChange: () => {}
};

export default InputDemo;
