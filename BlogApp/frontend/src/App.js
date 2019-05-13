import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppNavbar from './components/layout/AppNavbar'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import PostsPage from './components/pages/PostsPage';
import AboutPage from './components/pages/AboutPage';
import PageNotFound from './components/pages/PageNotFound';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
    render() {
        return (
            <Provider store= {store}>
                <Router>
                    <div className="App">
                        <AppNavbar />
                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route exact path='/posts' component={PostsPage} />
                            <Route path='/about' component={AboutPage} />
                            <Route path='*' component={PageNotFound} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));