import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Spinner
} from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    componentWillUnmount() {
        this.props.clearErrors();
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        const user = {
            username,
            password
        };
        
        // Attempt to login
        this.props.login(user);
        this.props.clearErrors();
    }

    render() {
        if(this.props.auth.isLoading) return <Spinner color="primary" />;

        const { isAuthenticated} = this.props;
        if(isAuthenticated) {
            const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
            return <Redirect to={from} />
        }

        return(
            <div>
                <Form onSubmit={this.onSubmit} className="mt-3">
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input 
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            className="mb-3"
                            onChange={this.onChange}
                        />

                        <Label for="password">Password</Label>
                        <Input 
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="mb-3"
                            onChange={this.onChange}
                        />
                        <Button
                            color="dark"
                            className="mt-3"
                        >Login</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownParams) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth,
    history: ownParams.history,
    location: ownParams.location
});

export default connect(mapStateToProps, { login, clearErrors })(Login);