import React, { Component } from 'react';
import { Table, Tabs, Tooltip } from "cloud-react";
import TestPopper from './popper';

export default class BasicGrid extends Component {
    tabBarStyle = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: 100
    };

    gridManagerName = "test-table";

    constructor(props) {
        super(props);
        this.state = {
            activeKey: "list"
        };
    }

    resource = (settings, params) => {
        // 返回一个promise
        return fetch(
            "https://www.lovejavascript.com/learnLinkManager/getLearnLinkList"
        ).then(res => res.json());
    };

    onClick = () => {
        this.setState({
            activeKey: "flow"
        });
    };

    columnData = [
        {
            key: "name",
            text: "名称",
            align: "left",
            template: (col, row) => (
                <div>
                    <Tooltip content={row.name}>{row.name}</Tooltip>
                </div>
            )
        },
        {
            key: "info",
            text: "使用说明",
            template: (col, row) => (
                <TestPopper content={row.info}>
                    {row.info}
                </TestPopper>
            )
        }
    ];

    onChange = key => {
        this.setState({
            activeKey: key
        });
    };

    onClose = key => {
        console.log(key);
    };

    reloadGrid = () => {
        Table.setQuery(this.gridManagerName);
    };

    gridCompleteInit = () => {
        this.reloadGrid();
    };

    render() {
        const moveRowConfig = {
            key: 'name',
            handler: (list, tableData) => {
                this.msgContent = tableData;
            }
        };
        return (
            <div className="App" style={{ padding: 50 }}>
                <Tabs
                    activeKey={this.state.activeKey}
                    onChange={this.onChange}
                    onClose={this.onClose}
                >
                    <Tabs.Panel
                        tab="活动列表"
                        key="list"
                        fixed
                        tabBarStyle={{
                            fontWeight: "bold",
                            marginRight: 15,
                            ...this.tabBarStyle
                        }}
                    >
                        <Table
                            gridManagerName={this.gridManagerName}
                            disableLine
                            supportAjaxPage
                            supportAutoOrder={false}
                            supportMoveRow
                            moveRowConfig={moveRowConfig}
                            checkboxConfig={{ useRowCheck: true }}
                            supportDrag={false}
                            supportCheckbox={false}
                            firstLoading={false}
                            ajaxData={this.resource}
                            columnData={this.columnData}
                            callback={this.gridCompleteInit}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel
                        tab="画布"
                        key="flow"
                        tabBarStyle={this.tabBarStyle}
                        closable
                    >
                        <Tooltip content="画布页面" placement="top-left">
                            <h5>画布页面</h5>
                        </Tooltip>
                        <Tooltip content="画布页面1" placement="top-left">
                            <h5>画布页面1</h5>
                        </Tooltip>
                    </Tabs.Panel>
                </Tabs>
            </div>
        );
    }
}
