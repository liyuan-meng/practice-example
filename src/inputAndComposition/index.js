import React, { Component } from 'react';
import Input from './input';
import Input1 from './input-error';

class CompositionDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            value1: ''
        };
    }

    onChange(evt) {
        this.setState({
            value: evt.target.value.replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g, '')
        });
    };

    onChange1(evt) {
        this.setState({
            value1: evt.target.value.replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g, '')
        });
    };

    setValue() {
        this.setState({
            value: Date.now().toString()
        })
    }

    render() {
        return (
            <div style={{ margin: '50px 0 0 30px' }}>
                <h4>1. 正确示例</h4>
                <div>
                    <p>受控的输入框：</p>
                    <Input
                        onChange={this.onChange.bind(this)}
                        value={this.state.value}
                    />
                    <button onClick={() => this.setValue()} style={{ marginLeft: 20 }}>设置</button>
                    <div style={{ marginTop: 30, fontSize: 12 }}>{this.state.value}</div>

                    <p>不受控输入框：</p>
                    <Input/>
                </div>
                <h4>2. 问题示例</h4>
                <div>
                    <p>受控的输入框（无法输入中文）：</p>
                    <Input1
                        onChange={this.onChange1.bind(this)}
                        value={this.state.value1}
                    />
                </div>
            </div>
           )
    }
}

export default CompositionDemo;
