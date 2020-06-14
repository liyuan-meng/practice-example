import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {Button} from 'cloud-react';
import ROUTER_CONFIG from './routerConfig';
import "cloud-react/cloud-react.css";

import './App.css';

class App extends Component {
    state = { active: ROUTER_CONFIG[0].title };

    onClick(title) {
        this.setState({ active: title });
    }

    render() {
        return (
            <Router>
                <ul className="app-router">
                    {
                        ROUTER_CONFIG.map((item, index) =>
                            <li key={index}>
                                <Link to={item.link}>
                                    <Button onClick={() => this.onClick(item.title)}
                                            type={this.state.active === item.title ? 'primary' : 'dashed'}>{item.title}</Button>
                                </Link>
                            </li>
                        )
                    }
                </ul>
                <Switch>
                    {
                        ROUTER_CONFIG.reverse().map((item, index) =>
                            <Route key={index} path={item.link} component={item.component}/>
                        )
                    }
                </Switch>
            </Router>
        );
    }
}

export default App;
