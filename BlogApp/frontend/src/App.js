import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'reactstrap';
import PrivateRoute from './components/auth/PrivateRoute';

import AppNavbar from './components/layout/AppNavbar';
import Message from './components/layout/Message';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import PostsPage from './components/pages/PostsPage';
import PostPage from './components/pages/PostPage';
import UpdatePostPage from './components/pages/UpdatePostPage';
import NewPostPage from './components/pages/NewPostPage';
import AboutPage from './components/pages/AboutPage';
import PageNotFound from './components/pages/PageNotFound';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
        store.dispatch(loadUser());
  }

  render() {
    return (
        <Provider store= {store}>
            <Router>
                <div className="App">
                    <AppNavbar />
                    <Container>
                        <Message />
                    </Container>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/login' component={LoginPage} />
                        <Route exact path='/register' component={RegisterPage} />
                        <Route exact path='/posts' component={PostsPage} />
                        <Route exact path='/posts/page:id' component={PostsPage} />
                        <PrivateRoute exact path='/posts/create-post' component={NewPostPage} />
                        <PrivateRoute exact path='/posts/:id/edit' component={UpdatePostPage} />
                        <Route exact path='/posts/:id'  component={PostPage} />
                        <PrivateRoute exact path='/dashboard' component={DashboardPage} />
                        <Route path='/about' component={AboutPage} />
                        <Route path='*' component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );    
  }
}

ReactDOM.render(<App />, document.getElementById('root'));