import React, { Component, createRef } from 'react';
import { Input, Button } from 'cloud-react';

export default class InsertAtCursor extends Component {
    state = { value: '' };

    ref = createRef();

    onChange = evt => {
        this.setState({ value: evt.target.value });
    };

    onInsert = () => {
        const field = this.ref.current.querySelector('textarea');

        // 指定光标处插入内容
        this.setState({ value: this.insertAtCursor(field, '@') });

        // 指定光标位置
        this.setCaretToPos(field);
    };

    insertAtCursor(field, value) {
        const startPos = field.selectionStart;
        const endPos = field.selectionEnd;
        field.value = `${field.value.substring(0, startPos)}${value}${field.value.substring(endPos, field.value.length)}`;
        field.selectionStart = startPos + value.length;
        field.selectionEnd = startPos + value.length;
        return field.value;
    }

    setCaretToPos(field) {
        field.focus();
        field.setSelectionRange(field.selectionStart, field.selectionEnd);
    }

    render() {
        const { value } = this.state;
        const { ref, onChange, onInsert } = this;

        return (
            <div style={{ margin: 200 }} ref={ref}>
                <Input.Textarea
                    value={value}
                    onChange={onChange}
                />
                <Button onClick={onInsert}>插入一个@</Button>
            </div>
        )
    }
}
