import React, { Component } from 'react';

const content = '\t\n' +
    'sdhfskdhfajhlfsjhflasdjhioweyoruiywqpiruwepoiruwoisdhfskdhfajhlfsjhflasdjhioweyoruiywqpiruwepoiruwoisdhfskdhfajhlfsjhflasdjhioweyoruiywqpiruwiruw';
const style = {
    display: 'inline-block',
    fontSize: '12px',
    fontFamily: 'Tahoma,Microsoft Yahei,sans-serif',
    textAlign: 'justify',
    width: '267px',
    wordBreak: 'break-all',
    lineHeight: '17px'
};

export default class getTextWidth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wordWidth: 0,
            wordHeight: 0
        };
    }

    componentDidMount() {
        this.setState({
            wordWidth: this.getTextWidth(content).width,
            wordHeight: this.getTextWidth(content).height
        })
    }

    getTextWidth(text) {

        const element = document.createElement('p');
        Object.assign(element.style, style);
        element.innerText = text;

        document.body.appendChild(element);

        const { width, height } = window.getComputedStyle(element);

        document.body.removeChild(element);

        return {
            width: parseInt(width, 10),
            height: parseInt(height, 10)
        };
    };

    render() {
        return (
            <div className="container" style={{ padding: 20 }}>
                <p style={style}>{content}</p>
                <div className="result">
                    宽度：{this.state.wordWidth}
                    高度：{this.state.wordHeight}
                </div>
            </div>
        )
    }
}
