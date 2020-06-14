import React, { Component } from 'react';
import go from 'gojs';
import './index.css';

export default class Test extends Component {
    componentDidMount() {
        const $ = go.GraphObject.make;
        const myDiagram = $(go.Diagram, "myDiagramDiv", {
            // enable Ctrl-Z to undo and Ctrl-Y to redo
            "undoManager.isEnabled": true,
            'dragSelectingTool.delay': 0,
            allowMove: false,
            // 设置网格背景
            grid: $(
                go.Panel,
                'Grid',
                $(go.Shape, 'LineH', { stroke: '#f9f9f9', strokeWidth: 1 }),
                $(go.Shape, 'LineH', { stroke: '#f5f5f5', strokeWidth: 1, interval: 5 }),
                $(go.Shape, 'LineV', { stroke: '#f9f9f9', strokeWidth: 1 }),
                $(go.Shape, 'LineV', { stroke: '#f5f5f5', strokeWidth: 1, interval: 5 })
            ),
            layout: $(
                go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 90, layerSpacing: 40 }
            )
        });
        // myDiagram.toolManager.dragSelectingTool.box =
        //     $(go.Part,
        //         { layerName: "Tool", selectable: false },
        //         $(go.Shape,
        //             { name: "SHAPE", fill: null, stroke: "chartreuse", strokeWidth: 3 }));

        myDiagram.nodeTemplate = $(
            go.Node,
            "Horizontal",
            { background: "#44CCFF" },
            $(
               go.Picture,
                { margin: 10, width: 50, height: 50, background: 'red' },
                new go.Binding("source")
            ),
            $(
                go.TextBlock,
                "Default Text",
                { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                // TextBlock.text is bound to Node.data.key
                new go.Binding("text", "key")
            ),
        );

        myDiagram.linkTemplate = $(
            go.Link,
            // default routing is go.Link.Normal
            // default corner is 0
            { routing: go.Link.Orthogonal, corner: 5 },
            {
                reshapable: true, resegmentable: true
            },
            // remember the (potentially) user-modified route
            new go.Binding("points").makeTwoWay(),
            // remember any spots modified by LinkShiftingTool
            new go.Binding("fromSpot", "fromSpot", go.Spot.parse).makeTwoWay(go.Spot.stringify),
            new go.Binding("toSpot", "toSpot", go.Spot.parse).makeTwoWay(go.Spot.stringify),
            // the link path, a Shape
            $(
                go.Shape,
                { strokeWidth: 3, stroke: "red" }
            ),
            // if we wanted an arrowhead we would also add another Shape with toArrow defined:
            // $(go.Shape, { toArrow: "Standard", stroke: null }
            $(
                go.Shape,
                { toArrow: "Standard", stroke: null }
            )
        );

        // common modal
        const myModel = $(go.Model);
        // for each object in this Array, the Diagram creates a Node to represent it
        myModel.nodeDataArray = [
            { key: "Alpha", source: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2411341495,3097540968&fm=26&gp=0.jpg' },
            { key: "Beta", source: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2411341495,3097540968&fm=26&gp=0.jpg' },
            { key: "Gamma", source: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2411341495,3097540968&fm=26&gp=0.jpg' },
            { key: "Gamma", source: '' }
        ];

        // tree modal
        const myModel1 = $(go.TreeModel);
        myModel1.nodeDataArray = [
            { key: "1",              name: "Don Meow",   source: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2411341495,3097540968&fm=26&gp=0.jpg" },
            { key: "2", parent: "1", name: "Demeter",    source: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2411341495,3097540968&fm=26&gp=0.jpg" },
            { key: "3", parent: "1", name: "Copricat",   source: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2411341495,3097540968&fm=26&gp=0.jpg" },
            { key: "4", parent: "3", name: "Jellylorum", source: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2411341495,3097540968&fm=26&gp=0.jpg" },
            { key: "5", parent: "3", name: "Alonzo",     source: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2411341495,3097540968&fm=26&gp=0.jpg" },
            { key: "6", parent: "2", name: "Munkustrap", source: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2411341495,3097540968&fm=26&gp=0.jpg" }
        ];
        myDiagram.model = myModel1;
    }

    render() {
        return (
            <div id="myDiagramDiv" style={{ width: 800, height: 600, border: '1px solid red', margin: 20 }}/>
        )
    }
}
