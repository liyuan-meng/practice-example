import InputAndComposition from './inputAndComposition/index';
import InsertAtCursor from './insertAtCursor';
import TestPopper from './testPopper';
import GetTextWidth from './getTextWidth';
import TestScroll from './testScroll';
import GoTest from './Go';
import Test from './test';
import Diagram from './diagram';

export default [
    {
        link: '/',
        title: 'test',
        component: Test
    },
    {
        link: '/diagram',
        title: 'diagram',
        component: Diagram
    },
    {
        link: '/goTest',
        title: 'go',
        component: GoTest
    },
    {
        link: '/testScroll',
        title: 'overflow: overlay',
        component: TestScroll
    },
    {
        link: '/getTextWidth',
        title: 'getTextWidth',
        component: GetTextWidth
    },
    {
        link: '/testPopper',
        title: 'TestPopper',
        component: TestPopper
    },
    {
        link: '/insertAtCursor',
        title: 'InsertAtCursor',
        component: InsertAtCursor
    },
    {
        link: '/compositionstart',
        title: 'compositionstart',
        component: InputAndComposition
    }
];
